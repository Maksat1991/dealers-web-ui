<template>
  <div class="d-flex flex-column" style="height: 100%">
    <v-form class="d-flex align-center" @submit.prevent="sendFile">
      <v-file-input
        v-model="file.visible"
        label="Выбрать файл"
        accept=".xls, .xlsx"
        class="mx-5"
      />
      <v-btn class="mx-5" type="submit" :loading="sendingFile || sendingResult">
        Загрузить
      </v-btn>
    </v-form>
    <template v-if="getTable.length && !sendingResult" class="row">
      <v-form
        v-model="valid"
        class="d-flex align-center"
        @submit.prevent="sendResults"
      >
        <v-text-field
          v-for="(input, index) of inputs"
          :key="index"
          v-model.number="input.value"
          :placeholder="input.hint"
          type="number"
          :hint="input.hint"
          class="mx-5"
          autocomplete="off"
          :rules="[
            (num) => (1 <= num && num <= input.max) || 'Вне значений таблицы'
          ]"
        />
        <v-select
          v-model="selectedCatalogName"
          class="mx-5"
          label="Каталог"
          :items="catalogNames"
          :rules="[$validate.required]"
        />
        <v-btn
          :disabled="!valid"
          class="mx-5"
          type="submit"
          :loading="sendingResult"
        >
          Отправить
        </v-btn>
      </v-form>
      <hot-table ref="table" :settings="settingsForTable"></hot-table>
    </template>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { mapGetters, mapActions } from 'vuex'
import Handsontable from 'handsontable'

export default {
  name: 'ImportVue',
  components: { HotTable },
  data: () => ({
    valid: false,
    file: {
      visible: new File([], '', undefined),
      copy: new File([], '', undefined)
    },
    sendingFile: false,
    sendingResult: false,
    inputs: {
      vendorCodeColumn: {
        hint: 'Артикул',
        value: null,
        max: 'columns.length'
      },
      nameColumn: {
        hint: 'Наименование',
        value: null,
        max: 'columns.length'
      },
      countColumn: {
        hint: 'Количество',
        value: null,
        max: 'columns.length'
      },
      priceColumn: {
        hint: 'Цена',
        value: null,
        max: 'columns.length'
      }
    }
  }),
  computed: {
    hot() {
      return new Handsontable(this.$refs.table.$el, this.settingsForTable)
    },
    settingsForTable() {
      return {
        data: this.getTable,
        licenseKey: 'non-commercial-and-evaluation',
        rowHeaders: true,
        colHeaders(header) {
          return header + 1
        },
        stretchH: 'all',
        height: '100%',
        contextMenu: {
          items: {
            remove_row: { name: 'Удалить строку' },
            remove_col: { name: 'Удалить колонку' }
          }
        },
        manualColumnResize: true,
        manualRowResize: true,
        selectionMode: 'single'
      }
    },
    ...mapGetters('table', ['getTable']),
    ...mapGetters('catalogs', ['getCatalogs']),
    catalogNames() {
      const range = []
      for (let i = 0; i < this.getCatalogs.length; i += 1)
        range.push(this.getCatalogs[i].name)
      return range
    },
    selectedCatalog: {
      get() {
        return this.$store.getters['catalogs/getSelectedCatalog']
      },
      set(selectedCatalog) {
        this.$store.commit('catalogs/updateSelectedCatalog', selectedCatalog)
      }
    },
    selectedCatalogName: {
      get() {
        return this.selectedCatalog.name
      },
      set(selectedCatalogName) {
        const selectedCatalog = JSON.parse(
          JSON.stringify(this.selectedCatalog.name)
        )
        this.selectedCatalog = selectedCatalog.selectedCatalogName
      }
    }
  },
  mounted() {
    // keep restriction on inputs if user leaves page and returns here (fix)
    if (this.getTable.length) this.updateTable(this.getTable)
    this.fetchCatalogs()
  },
  methods: {
    ...mapActions('catalogs', ['fetchCatalogs']),
    updateTable(table) {
      this.$store.commit('table/updateTable', table)
      Object.values(this.inputs).forEach((input) => {
        // set restriction for user so he can't put value more than it is possible
        if (input.max === 'columns.length') input.max = table[0].length
      })
    },
    async sendFile() {
      if (!this.file.visible) return
      this.sendingFile = true
      const file = this.file.visible

      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)
      const body = new FormData()
      body.append('file', file, file.name)

      await fetch('http://185.146.3.147:8082/api/catalog/import/preview', {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
      })
        .then((response) => response.text())
        .then((table) => {
          table = JSON.parse(table)
          table.forEach((row, rowIndex, rows) => {
            row.cells.forEach((cell, cellIndex, cells) => {
              cells[cellIndex] = cell.value
            })
            rows[rowIndex] = row.cells
          })
          this.updateTable(table)
        })
        .catch((error) => {
          console.log('error', error)
          this.sendingFile = false
        })
      this.file.copy = file
      this.file.visible = null
      this.sendingFile = false
    },
    async sendResults() {
      this.sendingResult = true

      const vendorCodeColumn = this.inputs.vendorCodeColumn.value
      const nameColumn = this.inputs.nameColumn.value
      const countColumn = this.inputs.countColumn.value
      const priceColumn = this.inputs.priceColumn.value
      const inputs = [vendorCodeColumn, nameColumn, countColumn, priceColumn]
      // if column indexes have duplicates, throw error
      if (new Set(inputs).size !== inputs.length) {
        await this.$store.dispatch('alert/updateAlert', {
          result: 'error',
          text: 'Индексы колонок не должны совпадать'
        })
        return (this.this.sendingResult = false)
      }
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)

      headers.append('Content-Type', 'application/json')
      const table = this.hot.getData()
      table.forEach((row, rowIndex, rowArray) => {
        const newRow = {}
        row.forEach((cell, cellIndex) => {
          switch (cellIndex + 1) {
            case vendorCodeColumn:
              newRow.articul = cell
              break
            case countColumn:
              newRow.count = cell
              break
            case nameColumn:
              newRow.name = cell
              break
            case priceColumn:
              newRow.price = cell
              break
          }
        })
        rowArray[rowIndex] = newRow
      })
      const body = {
        catalog_id: this.selectedCatalog.id,
        items: table
      }
      const res = await fetch('http://185.146.3.147:8082/api/catalog/import', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        redirect: 'follow'
      })
      if (res.ok) {
        this.updateTable([])
        Object.values(this.inputs).forEach((input) => {
          input.value = null
        })
        this.file.copy = null
        this.sendingResult = false
        await this.$store.dispatch('alert/updateAlert', {
          result: 'success',
          text: 'Успешно импортировано'
        })
      } else {
        this.sendingResult = false
        await this.$store.dispatch('alert/updateAlert', {
          result: 'error',
          text:
            'Попробуйте изменить данные (колонки цен и кол-ва должны содержать только числа)'
        })
      }
    }
  }
}
</script>
<style>
@import url('../../../node_modules/handsontable/dist/handsontable.full.css');
.ht_clone_top,
.ht_clone_left,
.ht_clone_top_left_corner {
  z-index: 1;
}
.colHeader {
  width: 100%;
}
.colHeader-Select {
  width: calc(100% - 12px);
  appearance: none;
  border: 1px solid #ccc;
  padding: 5px;
  background: #eee;
}
.colHeader-Select::-ms-expand {
  display: none; /* Remove default arrow in Internet Explorer 10 and 11 */
}
</style>

<template>
  <div class="d-flex flex-column" style="height: 100%">
    <div
      v-if="!fetchingCatalogs"
      class="d-flex align-center justify-space-between"
    >
      <v-form
        class="d-flex align-center flex-grow-1 mx-4"
        @submit.prevent="sendFile"
      >
        <v-file-input
          v-model="file.visible"
          label="Выбрать файл"
          accept=".xls, .xlsx"
          class="mx-3"
        />
        <v-btn
          type="submit"
          class="mx-3"
          :disabled="!file.visible"
          :loading="sendingFile"
        >
          Загрузить
        </v-btn>
      </v-form>
      <v-form
        class="d-flex align-center flex-grow-1 mx-4"
        @submit.prevent="sendResults"
      >
        <v-select
          v-model="selectedCatalogName"
          label="Каталог"
          class="mx-3"
          :items="catalogNames"
          :rules="[$validate.required]"
        />
        <v-btn
          class="mx-3"
          :disabled="!valid"
          type="submit"
          :loading="sendingResult"
        >
          Импортировать
        </v-btn>
      </v-form>
    </div>
    <div v-else class="row d-flex justify-center align-center text-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <template v-if="getTable.length && !sendingResult" class="row">
      <v-form
        v-model="valid"
        class="d-flex align-center"
        @submit.prevent="sendResults"
      >
      </v-form>
      <hot-table ref="table" :settings="settingsForTable"></hot-table>
    </template>
    <alert :alert="alert" />
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { mapGetters, mapActions } from 'vuex'
import Handsontable from 'handsontable'
import Alert from '../../../components/Alert/Alert'

export default {
  name: 'ImportVue',
  components: { HotTable, Alert },
  data: () => ({
    valid: false,
    file: {
      visible: null,
      copy: new File([], '', undefined)
    },
    sendingFile: false,
    sendingResult: false,
    columns: {
      vendorCode: null,
      name: null,
      count: null,
      price: null
    },
    alert: { result: '', text: '' },
    fetchingCatalogs: true
  }),
  computed: {
    hot() {
      return new Handsontable(this.$refs.table.$el, this.settingsForTable)
    },
    settingsForTable() {
      const { columns } = this
      return {
        data: JSON.parse(JSON.stringify(this.getTable)),
        licenseKey: 'non-commercial-and-evaluation',
        rowHeaders: true,
        colHeaders(headerIndex) {
          const header = document.createElement('select')
          header.setAttribute('onchange', 'headerChangeHandler(event)')
          header.classList.add(headerIndex + 1)
          header.classList.add('colHeader-Select')
          const defaultValue = document.createElement('option')
          defaultValue.textContent = 'Назначить'
          const vendorCode = document.createElement('option')
          vendorCode.setAttribute('id', 'vendorCode')
          vendorCode.textContent = 'Артикул'
          const name = document.createElement('option')
          name.setAttribute('id', 'name')
          name.textContent = 'Наименование'
          const count = document.createElement('option')
          count.setAttribute('id', 'count')
          count.textContent = 'Количество'
          const price = document.createElement('option')
          price.setAttribute('id', 'price')
          price.textContent = 'Цена'
          const options = [defaultValue, vendorCode, name, count, price] // keep order
          Object.values(columns).forEach((value, index) => {
            if (headerIndex === value - 1) {
              options[index + 1].setAttribute('selected', 'selected')
            }
          })
          options.forEach((option) => header.appendChild(option))
          return header.outerHTML
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
        const selectedCatalog = JSON.parse(JSON.stringify(this.selectedCatalog))
        selectedCatalog.name = selectedCatalogName
        this.selectedCatalog = selectedCatalog
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('catalogs/fetchCatalogs')
    this.fetchingCatalogs = false
    // keep table
    if (this.getTable.length) this.updateTable(this.getTable)
    window.headerChangeHandler = ({ target }) => {
      const optionText = target.options[target.selectedIndex].textContent
      // get column index from classList
      const columnIndex = +target.classList
        .toString()
        .split(' ')
        .filter((classItem) => +classItem)[0]
      switch (optionText) {
        case 'Артикул':
          this.columns.vendorCode = columnIndex
          break
        case 'Наименование':
          this.columns.name = columnIndex
          break
        case 'Количество':
          this.columns.count = columnIndex
          break
        case 'Цена':
          this.columns.price = columnIndex
          break
      }
    }
  },
  methods: {
    ...mapActions('catalogs', ['fetchCatalogs']),
    updateTable(table) {
      this.$store.commit('table/updateTable', table)
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

      const vendorCodeColumn = this.columns.vendorCode
      const nameColumn = this.columns.name
      const countColumn = this.columns.count
      const priceColumn = this.columns.price
      // if column indexes have duplicates, throw error
      if (
        new Set(Object.values(this.columns)).size !==
        Object.values(this.columns).length
      ) {
        setTimeout(() => {
          this.alert = { result: '', text: '' }
        }, 3000)
        return ([this.alert, this.sendingResult] = [
          {
            result: 'error',
            text:
              'Необходимо выбрать все колонки. Так же колонок каждого типа может быть только по одной штуке'
          },
          false
        ])
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
        Object.keys(this.columns).forEach((columnKey) => {
          this.columns[columnKey] = null
        })
        this.file.copy = null
        this.sendingResult = false
        this.alert = {
          result: 'success',
          text: 'Успешно импортировано'
        }
      } else {
        this.sendingResult = false
        this.alert = {
          result: 'error',
          text:
            'Попробуйте изменить данные (колонки цен и кол-ва должны содержать только числа)'
        }
      }
      this.sendingResult = false
      setTimeout(() => {
        this.alert = { result: '', text: '' }
      }, 3000)
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
.handsontable .wtBorder.current {
  z-index: 0;
}
</style>

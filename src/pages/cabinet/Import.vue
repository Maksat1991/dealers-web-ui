<template>
  <q-page class="flex" padding>
    <q-form @submit="sendFile" class="row full-width justify-center self-center">
      <q-file
        color="blue-12"
        v-model="file.visible"
        label="Выбрать таблицу"
        accept=".xls, .xlsx"
      />
      <q-btn class="q-my-lg" type="submit" :loading="sendingFile">Загрузить файл</q-btn>
    </q-form>
    <template v-if="getTable.length">
      <q-form @submit="sendResults" class="row full-width q-my-lg flex justify-around">
        <q-input
          class="q-mx-lg"
          v-for="(input, index) of inputs"
          :key="index"
          type="number"
          :hint="input.hint"
          v-model.number="input.value"
          :rules="[num => 1 <= num  && num <= input.max || 'Вне значений таблицы']"
        />
        <q-select
          class="q-mx-md"
          v-model="catalogId"
          label="ID Каталога"
          :options="catalogIdRange"
          style="width: 30%"
          :rules="[val => val || 'Необходимо выбрать каталог']"
        />
        <q-btn
          class="row q-my-lg"
          type="submit"
          :loading="sendingResult">
          Отправить
        </q-btn>
      </q-form>
      <imported-table class="q-mx-auto" :data="getTable" />
    </template>
  </q-page>
</template>

<script>
import { Notify } from 'quasar';
import { mapGetters } from 'vuex';
import ImportedTable from '../../components/Table/Table.vue';

export default {
  name: 'Import.vue',
  data() {
    return {
      file: {
        visible: new File([], '', undefined),
        copy: new File([], '', undefined),
      },
      sendingFile: false,
      sendingResult: false,
      inputs: {
        vendorCodeColumn: {
          hint: 'Артикул',
          value: null,
          max: 'columns.length',
        },
        nameColumn: {
          hint: 'Имя',
          value: null,
          max: 'columns.length',
        },
        countColumn: {
          hint: 'Количество',
          value: null,
          max: 'columns.length',
        },
        priceColumn: {
          hint: 'Цена',
          value: null,
          max: 'columns.length',
        },
      },
    };
  },
  components: {
    ImportedTable,
  },
  computed: {
    ...mapGetters('table', ['getTable']),
    ...mapGetters('catalogs', ['getCatalogs']),
    catalogIdRange() {
      const range = [];
      for (let i = 0; i < this.getCatalogs.length; i += 1) range.push(i + 1);
      return range;
    },
    catalogId: {
      get() {
        return this.$store.getters['catalogs/getSelectedCatalog'];
      },
      set(catalogId) {
        this.$store.commit('catalogs/updateSelectedCatalog', catalogId);
      },
    },
  },
  methods: {
    updateTable(table) {
      this.$store.commit('table/updateTable', table);
      Object.values(this.inputs).forEach((input) => {
        // set restriction for user so he can't put value more than it is possible
        if (input.max === 'columns.length') input.max = table[0].cells.length;
      });
    },
    async sendFile() {
      if (!this.file.visible) return;
      this.sendingFile = true;
      const file = this.file.visible;

      const token = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      const body = new FormData();
      body.append('file', file, file.name);

      await fetch('http://185.146.3.147:8082/api/catalog/import/preview', {
        method: 'POST',
        headers,
        body,
        redirect: 'follow',
      })
        .then(response => response.text())
        .then(table => this.updateTable(JSON.parse(table)))
        .catch((error) => {
          console.log('error', error);
          this.sendingFile = false;
        });
      this.file.copy = file;
      this.file.visible = null;
      this.sendingFile = false;
    },
    async sendResults() {
      this.sendingResult = true;

      const token = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const vendorCodeColumn = this.inputs.vendorCodeColumn.value;
      const nameColumn = this.inputs.nameColumn.value;
      const countColumn = this.inputs.countColumn.value;
      const priceColumn = this.inputs.priceColumn.value;

      const table = JSON.parse(JSON.stringify(this.getTable));
      // filter array
      table.forEach((row, index, array) => {
        row.cells = row.cells.filter((cell) => {
          if ([
            vendorCodeColumn,
            nameColumn,
            countColumn,
            priceColumn,
          ].includes(cell.number)) {
            array[index] = {
              articul: row.cells[vendorCodeColumn - 1].value,
              count: row.cells[countColumn - 1].value,
              name: row.cells[nameColumn - 1].value,
              price: row.cells[priceColumn - 1].value,
            };
            return true;
          } return false;
        });
      });
      const body = {
        catalog_id: this.catalogId,
        items: table,
      };
      const res = await fetch('http://185.146.3.147:8082/api/catalog/import', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        redirect: 'follow',
      });
      if (res.ok) {
        this.updateTable([]);
        Notify.create({
          message: 'Успешно импортировано',
          color: 'green',
          position: 'top-right',
        });
        Object.values(this.inputs).forEach((input) => {
          input.value = null;
        });
        this.file.copy = null;
        this.sendingResult = false;
      } else {
        Notify.create({
          message: 'Произошла ошибка при импортровании, попробуйте изменить данные в таблице',
          color: 'red',
          position: 'top-right',
        });
        this.sendingResult = false;
      }
    },
  },
  async mounted() {
    // keep restriction on inputs if user leaves page and returns here (fix_
    if (this.getTable.length) this.updateTable(this.getTable);
    // update catalogs
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    await fetch('http://185.146.3.147:8082/api/catalog', {
      method: 'GET',
      headers,
    })
      .then(response => response.text())
      .then(catalogs => this.$store.commit('catalogs/updateCatalogs', JSON.parse(catalogs)));
  },
};
</script>

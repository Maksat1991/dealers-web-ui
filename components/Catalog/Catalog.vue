<template>
  <div style="width: 99%; height: 90vh;">
    <div v-if="categoryToView" style="width: 100%; height: 90%;">
      <v-row class="mx-3 my-5">
        <v-btn
          rounded
          style="background-color: transparent"
          @click="addModal.show = true"
        >
          <v-icon class="mr-4" color="primary">mdi-plus</v-icon>
          <span style="color: #1a73e8">Добавить товар</span>
        </v-btn>
      </v-row>
      <div
        v-if="categoryToView.items.length"
        style="width: 100%; height: 100%;"
      >
        <catalog-table :settings="settingsForTable" />
      </div>
      <div v-else>
        <span>В данной категории нет товаров</span>
      </div>
      <add-modal
        v-if="addModal.show"
        :category_id="categoryToView.id"
        :modal="addModal"
      />
      <edit-modal
        v-if="editModal.show"
        :category_id="categoryToView.id"
        :modal="editModal"
      />
    </div>
    <div v-else></div>
  </div>
</template>
<script>
import CatalogTable from './-Table/Catalog-Table'
import AddModal from './-AddModal/Catalog-AddModal'
import EditModal from './-EditModal/Catalog-EditModal'

export default {
  name: 'Catalog',
  components: { CatalogTable, AddModal, EditModal },
  data: () => ({
    addModal: { show: false, item: [] },
    editModal: { show: false }
  }),
  computed: {
    categoryToView() {
      return this.$store.state.catalogs.categoryToView
    },
    settingsForTable() {
      let categoryIndex = 0
      const colHeaders = Object.keys(this.categoryToView.items[0]).map(
        (value, index) => {
          switch (value) {
            case 'id':
              return 'ID'
            case 'name':
              return 'Наменование'
            case 'price':
              return 'Стоимость'
            case 'measure':
              return 'Единица измерения'
            case 'articul':
              return 'Артикул'
            case 'category_id':
              categoryIndex = index
              return 'Категория'
            case 'is_visible':
              return 'Видимость'
            case 'base_price':
              return 'Базовая стоимость'
            case 'order_measure':
              return 'Единица измерения товара'
            default:
              return value
          }
        }
      )
      const data = this.categoryToView.items.map((row) =>
        Object.values(row).map((value) => {
          switch (value) {
            case 'KG':
              return 'Кг'
            case 'PIECE':
              return 'Шт'
            case 'LITER':
              return 'Литр'
            case true:
              return '+'
            case false:
              return '-'
            default:
              return value
          }
        })
      )
      data.forEach((row) => {
        row[categoryIndex] = this.$store.getters['catalogs/categoryToView'].name
      })
      const { editModal } = this
      return {
        data,
        editor: false,
        licenseKey: 'non-commercial-and-evaluation',
        colHeaders,
        stretchH: 'all',
        contextMenu: {
          items: {
            row_edit: {
              name: 'Изменить товар',
              callback(a, b) {
                editModal.item = this.getDataAtRow(b[0].end.row)
                editModal.show = true
              }
            }
          }
        },
        manualColumnResize: true,
        manualRowResize: true,
        selectionMode: 'single',
        disableVisualSelection: true,
        height: '100%',
        columnSorting: true
      }
    }
  }
}
</script>

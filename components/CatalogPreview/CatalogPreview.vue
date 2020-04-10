<template>
  <div v-if="categories">
    <v-treeview style="font-size: 12px" dense open-on-click :items="treeView">
      <template v-slot:label="{ item }">
        <v-list-item
          text
          @click="
            !item.children.length
              ? $store.commit('catalogs/updateCategoryToView', item)
              : undefined
          "
          @contextmenu.prevent="showContextMenu($event, item)"
        >
          {{ item.name }}
        </v-list-item>
      </template>
    </v-treeview>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list dense>
        <template v-if="category">
          <v-list-item
            v-for="(menuItem, index) in category.menu"
            :key="index"
            dense
            @click="menuItem.handler"
          >
            <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <add-modal
      v-if="addCategoryModal.show"
      :modal="addCategoryModal"
      :catalog="catalog"
      :category="category"
      @update-categories="updateCategories"
    />
    <edit-modal
      v-if="editCategoryModal.show"
      :select-items="getAllNamesOfCategories(treeView[0].children)"
      :modal="editCategoryModal"
      :category="category"
      :categories="categories"
      @update-categories="updateCategories"
    />
  </div>
</template>

<script>
import AddModal from './-AddModal/CatalogPreview-AddModal'
import EditModal from './-EditModal/CatalogPreview-EditModal'

export default {
  name: 'Catalog',
  components: { AddModal, EditModal },
  props: {
    catalog: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    categories: null,
    showMenu: false,
    x: 0,
    y: 0,
    editCategoryModal: {
      show: false,
      input: '',
      select: '',
      form: null,
      checkbox: false
    },
    addCategoryModal: {
      show: false,
      input: '',
      form: null,
      checkbox: false
    },
    category: null
  }),
  computed: {
    treeView() {
      const treeView = JSON.parse(JSON.stringify(this.catalog))
      treeView.categories = this.categories
      treeView.root = true
      const editChild = (child) => {
        if (child.categories) {
          Object.defineProperty(
            child,
            'children',
            Object.getOwnPropertyDescriptor(child, 'categories')
          )
          delete child.categories
        }
        if (child.children.length)
          child.children.map((child) => editChild(child))
        return child
      }
      const result = []
      result.push(editChild(treeView))
      return result
    }
  },
  watch: {
    category(category) {
      const {
        menuAddAction: add,
        menuRemoveAction: remove,
        menuEditAction: edit,
        editCategoryModal: editModal
      } = this

      editModal.checkbox = category.is_visible
      if (category.root) return (category.menu = [add()])
      else if (category.children.length)
        return (category.menu = [edit(category), add()])
      else if (category.items)
        return (category.menu = category.items.length
          ? [edit(category)]
          : [edit(category), remove(category), add()])
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    updateCategories(newCategories) {
      this.categories = newCategories
    },
    menuAddAction() {
      const { addCategoryModal } = this
      return {
        text: 'Добавить категорию',
        handler() {
          addCategoryModal.show = !addCategoryModal.show
        }
      }
    },
    menuRemoveAction(category) {
      const { removeCategory } = this
      return {
        text: 'Удалить',
        handler() {
          removeCategory(category)
        }
      }
    },
    menuEditAction(category) {
      const { treeView, editCategoryModal } = this
      return {
        text: 'Изменить',
        handler() {
          const getChildren = (childCategory) => {
            if (
              childCategory.children.filter((val) => val.id === category.id)
                .length
            )
              editCategoryModal.select = childCategory.name
            else
              childCategory.children
                .filter((val) => val.id === category.id)
                .forEach((category) => getChildren(category))
          }
          treeView[0].children.forEach((category) => getChildren(category))
          if (!editCategoryModal.select)
            editCategoryModal.select = 'В корень каталога'
          editCategoryModal.show = !editCategoryModal.show
        }
      }
    },
    async fetchCategories() {
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)

      await fetch(`${process.env.API}catalog/${this.catalog.id}`, {
        method: 'GET',
        headers
      })
        .then((response) => response.json())
        .then((response) => {
          this.categories = response.categories
          return response
        })
    },
    updateSelectedCatalog(catalog) {
      this.$router.push({ name: 'user-catalogs-import' })
      this.$store.commit('catalogs/updateSelectedCatalog', catalog)
    },
    showContextMenu({ clientX, clientY }, item) {
      ;[this.category, this.editCategoryModal.input] = [item, item.name]
      this.showMenu = false
      this.x = clientX
      this.y = clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    async removeCategory({ id }) {
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)

      const res = await fetch(`${process.env.API}category/${id}`, {
        method: 'DELETE',
        headers
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.message) this.categories = response.categories
          return response
        })
      await this.$store.dispatch(
        'alert/updateAlert',
        !res.message
          ? {
              result: 'success',
              text: 'Категория успешно удалена'
            }
          : {
              result: 'error',
              text: 'Произошла ошибка (категория должна быть пустой)'
            }
      )
    },
    getAllNamesOfCategories(categories) {
      const result = ['В корень каталога']
      const getChildren = (category) => {
        if (!category.items.length && category.name !== this.category.name) {
          result.push(category.name)
        }
        if (!category.children.length) return
        category.children.forEach((childCategory) => {
          getChildren(childCategory)
        })
      }
      categories.forEach((category) => getChildren(category))
      return result
    }
  }
}
</script>

<style>
.v-treeview-node__level {
  width: 10px;
}
</style>

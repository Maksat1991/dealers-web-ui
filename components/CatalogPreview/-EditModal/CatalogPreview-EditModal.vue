<template>
  <v-dialog v-model="modal.show" width="500">
    <v-card>
      <v-form v-model="modal.form" @submit.prevent="editCategory(category)">
        <v-card-title>
          Настройки категории
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="modal.input"
            :rules="[$validate.required]"
            :value="category.name"
            label="Название"
          />
          <v-switch
            v-model="modal.checkbox"
            :label="`Видимость: ${modal.checkbox ? 'включена' : 'выключена'}`"
          />
          <v-select
            v-model="modal.select"
            :items="selectItems"
            label="Перенести категорию в..."
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma-3"
            type="submit"
            rounded
            style="background-color: transparent"
          >
            <span style="color: #1a73e8">Сохранить</span>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditModal',
  props: {
    modal: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    selectItems: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    async editCategory({ id: category_id }) {
      const { modal, categories } = this

      const getParentCategoryId = (categories) => {
        const result = categories.filter(
          (category) => category.name === this.modal.select
        )[0]
        if (!result)
          categories.forEach((category) =>
            category.children.length
              ? getParentCategoryId(category.children)
              : undefined
          )
        else {
          return (parent_category_id = result.id) // eslint-disable-line camelcase
        }
      }
      let parent_category_id // eslint-disable-line camelcase
      getParentCategoryId(categories)
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)
      headers.append('content-type', 'application/json')

      const res = await fetch(`${process.env.API}/api/category`, {
        headers,
        body: JSON.stringify({
          category_id,
          name: modal.input,
          is_visible: modal.checkbox,
          parent_category_id
        }),
        method: 'PUT'
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.categories)
            this.$emit('update-categories', response.categories)
          return response
        })
      await this.$store.dispatch(
        'alert/updateAlert',
        !res.message
          ? {
              result: 'success',
              text: 'Категория успешно изменена'
            }
          : {
              result: 'error',
              text: 'Произошла неизвестная ошибка'
            }
      )
      this.modal.show = false
    }
  }
}
</script>

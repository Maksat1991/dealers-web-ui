<template>
  <v-dialog v-model="modal.show" width="500">
    <v-card>
      <v-form v-model="modal.form" @submit.prevent="addCategory">
        <v-card-title>Добавить категорию</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="modal.input"
            :rules="[$validate.required]"
            label="Название категории"
          />
          <v-switch
            v-model="modal.checkbox"
            :label="`Видимость: ${modal.checkbox ? 'включена' : 'выключена'}`"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" text>
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddModal',
  props: {
    modal: {
      type: Object,
      required: true
    },
    catalog: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addCategory() {
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)
      headers.append('content-type', 'application/json')
      const res = await fetch('http://185.146.3.147:8082/api/category', {
        headers,
        method: 'POST',
        body: JSON.stringify({
          catalog_id: this.catalog.id,
          name: this.modal.input,
          is_visible: this.modal.checkbox,
          parent_category_id:
            this.category.name !== this.catalog.name ? this.category.id : null
        })
      })
        .then((response) => response.json())
        .then((response) => {
          this.modal.input = ''
          this.$emit('update-categories', response.categories)
          return response
        })
      await this.$store.dispatch(
        'alert/updateAlert',
        !res.message
          ? {
              result: 'success',
              text: 'Категория успешно создана'
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

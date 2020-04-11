<template>
  <v-dialog v-model="modal.show">
    <v-card class="pa-5">
      <v-form v-model="valid" @submit.prevent="editItem">
        <v-card-title>Изменить товар</v-card-title>
        <v-card-text>
          <v-text-field
            v-model.number="form.name"
            type="text"
            :rules="[$validate.required]"
            label="Наименование"
          />
          <v-text-field
            v-model.number="form.articul"
            type="text"
            :rules="[$validate.required]"
            label="Артикул"
          />
          <v-switch
            v-model="form.is_visible"
            :label="`Видимость: ${form.is_visible ? 'включена' : 'выключена'}`"
          />
          <v-select
            v-model="form.measure"
            :items="measureItems"
            :rules="[$validate.required]"
            label="Единица измерения"
          />
          <v-select
            v-model="form.order_measure"
            :items="measureItems"
            :rules="[$validate.required]"
            label="Единица измерения товара"
          />
          <v-text-field
            v-model.number="form.base_price"
            type="number"
            label="Стоимость"
            :rules="[
              (value) => value > 0 || 'Стоимость должна быть больше нуля'
            ]"
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
          <v-spacer />
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
    // eslint-disable-next-line vue/prop-name-casing
    category_id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    valid: false,
    form: {
      name: '',
      articul: '',
      category_id: null,
      item_id: null,
      is_visible: false,
      measure: null,
      order_measure: null,
      base_price: 0
    },
    measureItems: ['Кг', 'Шт', 'Литр']
  }),
  mounted() {
    this.form.category_id = this.category_id
    this.form.item_id = this.modal.item[0]
    this.form.name = this.modal.item[1]
    // this.form.price = this.modal.item[2]
    this.form.measure = this.modal.item[3]
    this.form.articul = this.modal.item[4]
    // this.form.category_name = this.modal.item[5]
    this.form.is_visible = this.boolean(this.modal.item[6])
    this.form.base_price = this.modal.item[7]
    this.form.order_measure = this.modal.item[8]
  },
  methods: {
    async editItem() {
      const token = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${token}`)
      headers.append('content-type', 'application/json')

      this.form.measure = this.translate(this.form.measure)
      this.form.order_measure = this.translate(this.form.order_measure)

      const res = await fetch(`${process.env.API}api/item`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(this.form)
      })
        .then((response) => response.json())
        .then((response) => {
          this.modal.show = false
          this.$emit('update')
          this.$store.commit('catalogs/replaceItemToCategoryToView', response)
          return response
        })
      await this.$store.dispatch(
        'alert/updateAlert',
        !res.message
          ? {
              result: 'success',
              text: 'Товар успешно изменен'
            }
          : {
              result: 'error',
              text: 'Произошла неизвестная ошибка'
            }
      )
    },
    translate(word) {
      switch (word) {
        case 'Кг':
          return 'KG'
        case 'Шт':
          return 'PIECE'
        case 'Литр':
          return 'LITER'
        default:
          return word
      }
    },
    boolean(string) {
      switch (string) {
        case '-':
          return false
        case '+':
          return true
      }
    }
  }
}
</script>

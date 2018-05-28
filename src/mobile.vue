<template>
  <div id="app">
    <v-layout row wrap>
      <v-flex xs2>
        <v-select
          :items="allCountries"
          label="Select"
          single-line
          v-model="activeCountry"
          auto
          autocomplete
          hide-details
          :filter="customFilter"
        >
          <template slot="item" slot-scope="props" @click="choose(props.item)">
            <v-list-tile-content>
              <v-list-tile-title>{{ props.item.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              +{{ props.item.dialCode }}
            </v-list-tile-avatar>
          </template>
          <template slot="selection" slot-scope="props">
            <img :src="props.item.icon" class="imgsrc" alt="">
          </template>
        </v-select>
      </v-flex>
      <v-flex xs10>
        <v-text-field
        append-icon="clear"
        :append-icon-cb="deletePhone"
        :label="label"
        autocomplete="tel"
        type="phone"
        v-model="phoneNumber"
        @keyup.native="format(phoneNumber)"
        :required="required === 'true'"
        :placeholder="'+' + activeCountry.dialCode"
        :rules="[state || 'Le numéro de telephone n\'est pas valide (ne pas mettre le 0 pour les numéros francais)']"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { parse, format, asYouType as AsYouType, isValidNumber } from 'libphonenumber-js'
import allCountries from './assets/all-countries'
import getCountry from './assets/default-country'
export default {
  props: ['phone_pro', 'label', 'required'],
  mounted () {
    if (this.phone_pro === '' || this.phone_pro === null) {
      getCountry().then((res) => {
        this.activeCountry = allCountries.find(country => country.iso2 === res)
      })
    } else {
      var ext = parse(this.phone_pro)
      this.activeCountry = this.allCountries.find(ele => ele.iso2.toUpperCase() === ext.country)
    }
  },
  data () {
    return {
      allCountries,
      activeCountry: allCountries[0],
      phoneNumber: '',
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },
  created () {
    if (this.phone_pro) {
      this.phoneNumber = this.phone_pro
    }
  },
  computed: {
    formattedResult () {
      const formatter = new AsYouType()
      let phone = this.phoneNumber
      if (phone && phone[0] === '+') {
        // if user manually type the country code
        formatter.input(this.phone)
        this.activeCountry = this.allCountries.find(ele => ele.iso2.toUpperCase() === formatter.country) || this.activeCountry
      } else if (phone && phone[0] === '0') {
        this.phoneNumber.slice(1)
      }
      return format(phone, this.activeCountry && this.activeCountry.iso2, 'International')
    },
    state () {
      if (this.phoneNumber !== null) {
        if (this.required === 'false' && this.phoneNumber.length === 0) {
          return true
        } else if (this.required === 'false' && this.phoneNumber.length > 0) {
          return isValidNumber(this.formattedResult, this.activeCountry.iso2)
        } else {
          return isValidNumber(this.formattedResult, this.activeCountry.iso2)
        }
      } else if (this.required === 'false') {
        return true
      }
    }
  },
  watch: {
    state (value) {
      if (value && this.phoneNumber !== null) {
        this.phoneNumber = this.formattedResult
        this.$emit('phone_formatted', this.phoneNumber)
      }
    }
  },
  methods: {
    choose (country) {
      this.activeCountry = country
    },
    format (value) {
      this.phoneNumber = new AsYouType(this.activeCountry.iso2).input(value)
    },
    deletePhone () {
      this.phoneNumber = null
    }
  }
}
</script>

<style>
.imgsrc {
  width: 25px;
  border-radius: 2px;
}
</style>

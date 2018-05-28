# vuetify-phone-input
International Telephone Input with Vue, using vuetify. Based on EducationLink repository
https://github.com/EducationLink/vue-tel-input

Checkout Demo at [Codesandbox](https://ry3wlvlxkn.codesandbox.io/).

## Installation
- **npm**: 
  ```bash 
    npm i --save vuetify-phone-input 
  ```

## Usage

- Install as a global component:
    ```javascript
    import Vue from 'vue'
    import VueTelInput from 'vuetify-phone-input'

    Vue.use(VueTelInput)
    ```

- In your component:  
     ```js
     <template>
     ...
        <mobile @phone_formatted="childUpdate($event)" required="false" label="Phone" :phone_pro="" v-model="user.phone_pro"></mobile>
     ...
     <template>
     <script>
     export default {
       data() {
         return {
           phone: '',
         };
       },
       methods: {
         /** 
          * @param {string} number
          * the phone number inputted by user, will be formatted along with country code 
          * // Ex: inputted: (AU) 0432 432 432
          * // number = '+61432421546'
          * 
          */
          childUpdate (number) {
            console.log(number)
          }
       },
     }
     </script>
     ```

## Highlights & Credits
- Vue Component based on EducationLink
- Vue app created by [vue-cli](https://github.com/vuejs/vue-cli).
- Telephone Number parsing, validation by [libphonenumber-js](https://catamphetamine.github.io/libphonenumber-js/).
- Country Codes data from [intl-tel-input](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/data.js).
- Country Flags by [behdad/region-flags](https://github.com/behdad/region-flags).
- User's Location by [get-json](https://www.npmjs.com/package/get-json) and [ipifo.io](https://ipinfo.io/json)


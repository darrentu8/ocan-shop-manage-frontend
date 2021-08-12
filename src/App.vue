<template lang="pug">
  router-view
</template>

<script>

export default {
  name: "App",
  components: {    
  },
  data: () => ({
    //
  }),
};
</script>


<style lang="sass">
.v-main__wrap
  display: flex
  padding-left: 256px

.v-toolbar__content
  // background-color: #3E3A39
  // text-decoration: underline

.v-navigation-drawer
  .v-list-group
    .v-list-item 
      min-height: 43px
    .v-list-group__items
      margin-bottom: 10px
    
@media ( max-width: 960px )
  .v-main__wrap
    padding-left: 0

</style>

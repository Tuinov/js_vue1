const app = new Vue({
  el: '#app',
  data: {

    items: [],
    searchQuery: '',  
  },
    
    methods: {
       handleclick(){
           alert('working');
       } 
    },
    
    mounted(){
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((items) => {
            this.items = items;
        });
    },
    
    computed: {
        filteredItems() {
            const regexp = new RegExp(this.searchQuery, 'i');
            return this.items.filter((item) => regexp.test(item.name));
        }
    }
    
});
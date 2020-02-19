Vue.component('todo-item', {
    props: ['todo', 'index'],
    template: `
        <li>
            {{ todo.text }}
            <input type="checkbox" v-model="todo.completed" v-on:change="updateComplete" title="Marcar como concluído"/>
            <button class="delete" v-on:click="deleteTodo(index)">deletar</button>
        </li>
    `,
    
    methods:{
        deleteTodo: function(idx){
            this.$root.todos.splice(idx, 1)
            this.updateComplete()
        },
        updateComplete: function(){
            const size = this.$root.todos.length
            const marked = this.$root.todos.filter((todo)=> todo.completed).length
            
            const total =  size === 0 ? 0 : parseFloat(marked / size * 100).toFixed(1)  
            this.$root.totalComplete = total
        }
    }
})


var app = new Vue({ 
    el: '#app',
    data: {
        newTodo: "",
        totalComplete: 0,
        todos: [
            { text: 'Aprender Vue.Js', completed: false },
            { text: 'Aprender SASS', completed: false},
            { text: 'Integrar as duas coisas', completed: false }
        ]
    },

    methods:{
        addTodo: function(e){
            e.preventDefault()
            
            if(this.newTodo === "")
                alert("TODO não pode ser vazio")
            else{
                this.todos.push({text: this.newTodo, completed: false})
                this.newTodo = ""
            }
        },
    }
});

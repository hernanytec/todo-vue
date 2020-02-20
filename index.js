Vue.component('todo-item', {
    props: ['todo', 'index'],
    template: `
        <li>
            <span v-if="!todo.edit">{{ todo.text }}</span>
            
            <form v-if="todo.edit" v-on:submit.prevent="editTodo(index)">
                <input autofocus v-model="todo.text" type="text"></input>
            </form>

            <input type="checkbox" v-model="todo.completed" v-on:change="markItem(index)" title="Marcar como concluído"/>
            
            <div class="buttongroup">
                <button class="edit" v-on:click="editTodo(index)">{{todo.edit ? "salvar" : "editar"}}</button>
                <button class="delete" v-on:click="deleteTodo(index)">deletar</button>   
            </div>
        </li>
    `,

    methods: {
        deleteTodo: function (idx) {
            this.$root.todos.splice(idx, 1)
            this.$root.updateComplete()
        },
        markItem: function (idx) {
            this.$root.todos[idx].marked = !this.$root.todos[idx].marked
            this.$root.updateComplete()
        },
        editTodo: function (idx) {
            this.$root.todos[idx].edit = !this.$root.todos[idx].edit
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        newTodo: "",
        totalComplete: 0,
        todos: [
            { text: 'Aprender Vue.Js', edit: false },
            { text: 'Aprender SASS', edit: false },
            { text: 'Integrar as duas coisas', edit: false }
        ]
    },

    methods: {
        addTodo: function (e) {
            e.preventDefault()

            if (this.newTodo === "")
                alert("TODO não pode ser vazio")
            else {
                this.todos.push({ text: this.newTodo, edit: false })
                this.newTodo = ""
                this.updateComplete()
            }
        },
        updateComplete: function () {
            const size = this.todos.length
            const marked = this.todos.filter((todo) => todo.completed).length

            const total = size === 0 ? 0 : parseFloat(marked / size * 100).toFixed(1)
            this.$root.totalComplete = total
        }
    }
});

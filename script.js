Vue.component('teo-comp', {
    props: ['name', 'type', 'pattern', 'check-points'],
    data: function () {
        return {
            value: '',
            testPattern: '',
        }
    },
    template: `
    <div>
        <label for="">
            <span>{{ name }} {{ testPattern }}</span>
            <input :type="type" :pattern="pattern" @keyup="testValue" v-model="value">
        </label>
    </div>
    `,
    methods: {
        increaseBar() {
            this.$emit('increase-bar');
        },
        decreaseBar() {
            this.$emit('decrease-bar');
        },
        testValue() {
            if (this.pattern.test(this.value)) {
                this.testPattern = '+';
                this.increaseBar();
            } else {
                this.testPattern = '-';
                this.decreaseBar();
            }
        },
    },
});

new Vue({
    el: '#root',
    data: {
        progress: 0,
        buttonState: true,
        checkPoints: [],
        properties: [
            {name: 'Name', type: 'text', pattern: /[A-Za-z ]{2,32}/},
            {name: 'Last Name', type: 'text', pattern: /[A-Za-z ]{2,32}/},
            {
                name: 'E-Mail',
                type: 'email',
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            },
        ]
    },
    methods: {
        increaseBar(key) {
            this.checkPoints.splice(key, 1, 1);
            this.fillBar();
        },
        decreaseBar(key) {
            this.checkPoints.splice(key, 1, 0);
            this.fillBar();
        },
        fillBar() {
            this.progress = 100 / this.properties.length * this.checkPoints.reduce((sum, current) => sum + current, 0);
            this.progress === 100 ? this.buttonState = false : this.buttonState = true;
        }
    },
});
// const STORAGE_KEY='test.js'
// function storeFetch() {
//     return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]')
// }
// function storeSave(items) {
//     window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
// }                    //可以利用localStorage读取本地数据
Vue.component('list-template',{
    template:'#list-template',
    data:function () {                //组件数据，必须是function
        return{
            column:[{name:'姓名',isKey:true},{name:'年龄'},{name:'性别',dataSource: ['男', '女']},{name:'籍贯'},{name:'专业'}],
            people:[ {姓名:'张三',年龄:'25',性别:'男',籍贯:'浙江',专业:'电子'},
                     {姓名:'李四',年龄:'27', 性别:'男',籍贯:'上海',专业:'生物'}],
            // people:storeFetch(),
            showDialog:false,   //控制输入框显示
            mode:0,             //mode = 1是新增数据模式，mode = 2是修改数据模式
            title:''            //输入框的title
        }

    },
    methods:{
        del:function(index){                    //删除功能，原生js splice函数
            this.people.splice(index,1);
            },
        creatItem:function(){                   //弹出输入框
                // this.shows=true;
            this.showDialog=true;
            this.mode=1;
            this.title='Creat New Item'
            },
        openEdit:function (index) {             //弹出数据编辑框
            this.showDialog=true;
            this.mode=2;
            this.title='Edit Item';
            this.$children[0].item=JSON.parse(JSON.stringify(this.people[index]));   //用js原生的json序列化的方式深度复制
            this.$children[0].index=index;
        }     
    },
    // watch:{                                                      
    //     people:{
    //         handler:function(people){
    //             storeSave(people)
    //         },
    //         deep:true
    //     }
    // },
    components:{                                                        //子组件：输入框
        'dialog-template':{         
            template:'#dialog-template',
            props:['show','columns','mode','title'],                    //参数传递
            data:function () {
                return{
                    item:{},
                    index:''
                }
            },
            methods:{
                close:function(){
                    if (this.mode===2) {
                        this.item={};
                    }
                    this.$parent.showDialog=false;
                },
                save:function () {
                    if (this.mode===1) {
                             if (this.item['姓名']) {
                            this.$parent.people.push(this.item);
                            this.$parent.showDialog=false;
                            this.item={};
                            }
                            else{
                                
                                this.$parent.showDialog=false;
                            }
                    }
                   if (this.mode===2) {
                            if (this.item['姓名']) {
                            this.$parent.people[this.index]=this.item;
                            this.$parent.showDialog=false;
                            this.item={};
                            }
                            else{
                                
                                this.$parent.showDialog=false;
                            }
                   }
                    
                }
            }
        }
    }
})
new Vue({
	el:'#app'
})

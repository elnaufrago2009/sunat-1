// funcion para agregar cero al mes
function pad(n, length) {
    var n = n.toString();
    while (n.length < length)
        n = "0" + n;
    return n;
}
var f = new Date();
var ff = f.getFullYear() + "-" + pad((f.getMonth() + 1), 2) + "-" + pad(f.getDate(), 2);
var app = new Vue({
    el: '#app',
    created: function () {
        this.getDocuments();
    },
    data: {
        documento: [],
        document: [],
        documents: [],
        loading: false,
        loadingFactura: false,
        fecha: this.ff,
        search: '',
        allFacturas: [],
        allBoletas: [],
        loadFacturas: false,
        loadBoletas: false,
        loadActivarFacturas: true,
        loadActivarBoletas: true,
    },
    methods: {
        getDocuments: function () {
            this.loading = true;
            this.$http.get('./apis/index.php?fecha=' + this.fecha).then(function (response) {
                this.loading = false;
                this.documents = response.data;
            });
        },
        itemClicked: function (document) {
            this.documento = '',
            this.document = document;
            this.loadingFactura = true;
            $("#invoice").modal('show');
            this.$http.get('./apis/documento.php' + document.pdf_link).then(function (response) {
                this.loadingFactura = false;
                this.documento = response.data;
            });
        },
        enviarFacturas: function () {
            this.loadFacturas = true;
            this.loadActivarFacturas = false;
            this.$http.get('./apis/envio_facturas.php').then(function (response) {
                this.loadFacturas = false;
                this.allFacturas = response.data;
            })
        },
        enviarBoletas: function () {
            this.loadBoletas = true;
            this.loadActivarBoletas = false;
            this.$http.get('./apis/envio_boletas.php').then(function (response) {
                this.loadBoletas = false;
                this.allBoletas = response.data;
            })
        },
        activarEnvio: function () {
            $("#enviarFacturas").modal('show');
        },
        activarEnvioBoletas: function () {
            $("#enviarBoletas").modal('show');
        },
        printPDF: function (doc) {
            document.title = "";
            window.print();
        },

    },
    computed: {
        filteredDocuments: function () {
            return this.documents.filter((document) => {
                return document.cliente.match(this.search);
            });
        }
    }

})
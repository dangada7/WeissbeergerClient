<template>
    <!-- The Modal -->
    <div id="myModal" class="modal" v-if="showPopUp.val" @click="showPopUp.val = false">

        <!-- Modal content -->
        <div class="modal-content" @click.stop>
            <span class="close" @click="showPopUp.val = false">&times;</span>
            <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Popup',

    props: {
        showPopUp: Object
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* The Modal (background) */
.modal {
    display:block ; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #191919		;
    margin: auto;
    padding: 8px;
    width: 80%;
    max-width: 700px;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>

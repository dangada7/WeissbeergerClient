<template>
    <div class="dropdown">
        <slot name="select"></slot>

        <div class="dropdown-content">
            <slot name="options"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dropdown"
}
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    /*padding: 12px 16px;*/
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
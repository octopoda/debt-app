<template>
    <nav class="backNav">
        <div>
            <nuxt-link :to="backLink">
                <i class="material-icons">chevron_left</i>
                {{ backButtonText }}
            </nuxt-link>
        </div>
        <div v-show="edit">
            Edit
        </div>
    </nav>
</template>

<script>
export default {
    props: ['backButtonText', 'backLink',  'edit', 'editLink']
}
</script>

<style lang="scss" scoped>
    .backNav {
        display:grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        

        div:last-child {
            justify-self: end;
        }
    }
    
    .backNav div:first-child {
        position:relative;

        i {
            position:relative;
            top: 8px;
        }
    }
</style>
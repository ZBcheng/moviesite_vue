<template>

    <div id="detail">

        <div>
            {{ movie.name }}
        </div>
    </div>

</template>


<script>

    export default {
        data() {
            return {
                movie: this.$route.query.movie,
                host: "http://127.0.0.1:8000/"
            }
        },


    }
</script>
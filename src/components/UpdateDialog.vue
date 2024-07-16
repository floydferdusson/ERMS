<template >
    <div>
        <q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="text-h6">
            REFERENCES
            <q-btn label="Add" @click="ReferenceDialog = true"></q-btn>
          </div>
        </q-card-section>
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          dense
          :rows="reference"
          :columns="columns"
          row-key="id"
        ></q-table>
      </q-card-section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columns: [
        {
          name: "Update Type",
          align: "left",
          label: "Name",
          field: "type",
          sortable: true,
        },
        {
          name: "Field",
          align: "center",
          label: "Address",
          field: "label",
          sortable: true,
        },
        {
          name: "Data From",
          align: "center",
          label: "Contact Number",
          field: "TelNo",
          sortable: true,
        },
      ],
        }
    }
}
</script>
<style lang="">
    
</style>
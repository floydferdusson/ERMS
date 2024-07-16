<script setup>
import {date} from "quasar"
import {formatName} from "../f-utils"

const today = date.formatDate(new Date(), 'MMM DD, YYYY')
const addressedTo = {
  name: 'Hon. Rey T. Uy',
  position: 'City Mayor',
  address1: 'City Hall',
}
const addressedThru = {
  name: 'Janylene A. Palermo, MM',
  position: 'City Human Resource Management Officer',
}
const applicant = defineModel('applicant')
const positions = defineModel('positions')
</script>

<template>
  <div id="contentToConvert" class="floyd row justify-start content-start items-start">
    <div class="col-12 row HEADER">
      <div class="col-12 row BODY" style="padding: 0 96px">
        <div class="col-12">{{ today }}</div>
        <div class="col-12 q-pt-xl q-pb-lg column">
          <div class="text-uppercase text-weight-bold">{{ addressedTo.name }}</div>
          <div>{{ addressedTo.position }}</div>
          <div>{{ addressedTo.address1 }}</div>
        </div>


        <div class="col-6 row reverse q-pb-lg" style="min-width: 300px">
          <div class="text-weight-bold col-11 q-pl-md text-uppercase">{{ addressedThru.name }}</div>
          <div class="text-weight-bold col-1">Thru: </div>
          <div class="col-11 q-pl-md">{{ addressedThru.position }}</div>
        </div>

        <div class="col-12 q-pb-md">Dear Mayor,</div>

        <p class="col-12 q-pb-xs f-text-justify">
          In view of the reorganization of the Local Government Unit of Tagum City, I,
          <span class="text-uppercase text-weight-bold">{{ formatName(true, applicant) }}</span>, {{ applicant.position }}<span v-if="applicant.office"> of the {{ applicant.office }}</span>, intend to
          apply for the following position{{ positions.length > 1 ? 's' : '' }}:
        </p>
        <div v-for="(position, index) in positions" class="col-12 row q-pb-md" :key="index">
          <div class="col-12 row no-wrap">
            <div class="col-1" style="width: 14px; max-width: 14px">{{ index+1 }}.</div>
            <div class="col-8 q-pl-xs">{{ position.title }}</div>
            <div class="col row no-wrap justify-end">
              <div class="col-shrink q-px-sm">SG</div>
              <div class="col-1 text-right" style="border-bottom: thin solid black">
                {{ position.salaryGrade }}
              </div>
              <div class="col-shrink q-px-sm">Item No.</div>
              <div class="col-1 text-right" style="border-bottom: thin solid black">
                {{ position.plantillaId }}
              </div>
            </div>
          </div>

          <div v-if="position.subtitle" class="col-12 row no-wrap">
            <div class="col-1" style="width:14px; max-width:14px"/>
            <div class="col q-pl-xs text-italic">{{ position.subtitle }}</div>
          </div>

          <div class="col-12 row no-wrap">
            <div class="col-1" style="width:14px; max-width:14px"/>
            <div class="col q-pl-xs" style="font-size: x-small">{{ position.office }}</div>
          </div>

        </div>

        <p class="col-12 q-py-lg f-text-justify">
          I am truly grateful for having been given the privilege to work as a public service provider. I am looking forward to sharing my skills and capabilities toward achieving the city government’s vision.
        </p>
        <div class="col-4">Sincerely yours,</div>
        <div class="col-12 q-py-lg"/>
        <div class="col-4 text-uppercase text-weight-bold">{{ formatName(false, applicant) }}</div>
        <div class="col-12"/>
        <div class="col-4">Applicant</div>
      </div>
    </div>

    <!--    <div class="col-12 self-end FOOTER">-->
    <!--      <q-img class="full-width" src="~assets/f/footer.png"/>-->
    <!--    </div>-->

  </div>
</template>

<style scoped>
#contentToConvert {
  font-family: "Avenir", Arial, sans-serif;
  width: 100%;
  aspect-ratio: 1/1;
}
</style>

<style>
.f-text-justify {
  text-align: justify;
  text-justify: inter-word;
}
</style>

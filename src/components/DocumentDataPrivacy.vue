<script setup>
import { formatName } from "../f-utils";


const title = "Non-disclosure agreement with undertaking"
const paragraphs = [
  'This information includes, but is not limited to the following: files, applicant details, reorganization office structures, records, protocols, proposals, interviews, deliberation reports, ranking results, schedules, computer programs, and all other placement information.',
  'I understand that I must sign this Non-Disclosure Agreement upon the commencement of my association with the reorganization and placement process.',
  'I agree that during my association with the Reorganization and Placement Process, I shall not disclose to any other person and/or other agencies, any confidential information relating to the Reorganization and Placement process, except for the specific purposes required by my duties or those authorized by the appointing authority and/or allowed by the law.',
  'Further, I understand that I am required to notify the appointing authority immediately of any breach of obligations or conflict of interest under this agreement that comes to my attention.',
  'By signing this document, I confirm my understanding and acceptance of the above clause and will comply with these clauses.',
  'I hereby undertake to comply with herein provisions and any breach thereof would entail my liability in accordance with law.',
]

const position = defineModel('position')
const applicant = defineModel('applicant')
</script>

<template>
  <div id="contentToConvert" class="flex row">
    <div class="col-grow row HEADER">
      <q-img class="col-12" src="~assets/f/header.png"/>
      <div class="col-12 text-center text-h6 text-weight-bold text-uppercase">{{ title }}</div>
      <div class="col-12 row q-px-xl BODY q-mb-xl">
        <div class="col-12 q-py-sm f-text-justify">
          I acknowledge that, as {{ /^[aeiouAEIOU]/.test(applicant.position) ? 'an' : 'a' }}
          <div class="text-weight-bold text-uppercase" style="text-decoration:underline; display: inline">{{ applicant.position }}</div>,
          employee of the City Government of Tagum, I will have access to certain confidential information may it be oral,
          written, or electronic.
        </div>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="col-12 f-text-justify">
          {{ paragraph }}
        </p>
        <div class="col-4 column q-pt-xl">
          <div style="min-width: 280px">
            <div class="q-mt-xl text-weight-bold text-uppercase text-center">{{ formatName(false, applicant) }}</div>
            <q-separator />
            <div class="text-weight-bold text-uppercase">(Signature Over Printed Name)</div>
          </div>
        </div>
        <q-space class="col-8"/>
        <q-space class="col-12" style="min-height: 20px"/>
        <div class="col-2">
          <div style="min-width:100px">
            <div class="q-pt-xl"/>
            <q-separator />
            <div class="text-weight-bold text-uppercase">(Date Signed)</div>
          </div>
        </div>
      </div>
      <div class="col-12 q-pt-xl column reverse FOOTER">
        <q-img class="full-width" src="~assets/f/footer.png"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
#contentToConvert {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  aspect-ratio: 1/1.29;
}
</style>

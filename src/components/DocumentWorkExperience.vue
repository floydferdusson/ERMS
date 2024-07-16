<script setup>
import {createDate, formatName} from "src/f-utils";

const applicant = defineModel('applicant')
const workExperiences = defineModel('workExperiences')
const today = createDate(new Date()).longStr
</script>

<template>
  <div id="contentToConvert" class="floyd row justify-start items-start">
    <div class="BODY col-12 row justify-start items-start content-start" style="padding: 0 48px">
      <div class="col-12 border-black bg-grey-5 text-white text-center text-h6 text-weight-bold text-italic">WORK EXPERIENCE SHEET</div>
      <div class="col-12 border-black bg-grey-3 row">
        <div class="col-shrink q-pl-sm label-max-width">Name:</div>
        <div class="col-grow q-pl-md text-weight-bold">{{ formatName(true, applicant) }}</div>
      </div>
      <div class="col-10 border-black bg-grey-3 row">
        <div class="col-shrink q-pl-sm label-max-width">Position:</div>
        <div class="col-grow q-pl-md text-weight-bold">{{ applicant.position }}</div>
      </div>
      <div class="col-grow border-black bg-grey-3 row">
        <!-- TODO data binding -->
        <div class="col-shrink q-pl-sm" style="min-width: 40px">SG:</div>
        <div class="col-grow q-pl-sm text-weight-bold">{{ applicant.salaryGrade }}</div>
      </div>
      <div class="col-12 border-black bg-grey-3 row">
        <!-- TODO data binding -->
        <div class="col-shrink q-pl-sm label-max-width">Office:</div>
        <div class="col-grow q-pl-md text-weight-bold">{{ applicant.office }}</div>
      </div>

      <div v-for="exp in workExperiences" class="col-12 border-black row q-px-xl q-py-sm" :key="exp.id">
          <div class="col-12">
            <span style="font-weight: bold">Duration: </span>
            <span>{{ createDate(exp.durationFrom).longStr }} - {{ createDate(exp.durationTo).longStr }}</span>
          </div>
          <div class="col-12 q-pb-sm">
            <div style="line-height: 1">
              <span style="font-weight: bold">Position: </span>
              <span>{{ exp.position }}</span>
              <span v-if="!!exp.status && exp.status !== '' && exp.status !== 'PERMANENT'"> ({{ exp.status }})</span>
              <span v-else> (PERMANENT)</span>
            </div>
          </div>
          <div class="col-12 row">
            <span class="col-shrink text-weight-bold q-pr-sm">Name of Office/Unit: </span>
            <span class="col-grow">{{ exp.office }}</span>
          </div>
          <div class="col-12 row">
            <span class="col-shrink text-weight-bold q-pr-sm">Immediate Supervisor: </span>
            <span class="col-grow">{{ exp.supervisor }}</span>
          </div>
          <div class="col-12 row">
            <span class="col-shrink text-weight-bold q-pr-sm">Name of Agency/Organization and Location: </span>
            <span class="col-grow">{{ exp.location }}</span>
          </div>
          <div class="col-12 row">
            <div class="col-shrink text-weight-bold q-pr-sm">List of Accomplishment and Contributions (if any)</div>
            <div class="row reverse">
              <div class="col-12 q-pl-lg" v-for="({ Accomplishment, ID }) in exp['accomplishments']" :key="`acc${ID}`">
                - {{ Accomplishment }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="text-weight-bold">Summary of Actual Duties</div>
            <div class="row reverse">
              <div class="col-12 q-pl-lg" v-for="({ Duties, ID }) in exp['duties']" :key="`dut${ID}`">- {{ Duties }}</div>
            </div>
          </div>
        </div>
      <div class="FOOTER col-12 q-pt-xl row reverse">
        <div class="col-shrink column text-center">
          <div class="col-3 text-weight-bold">{{ formatName(false, applicant) }}</div>
          <div class="col-2" style="border-top: thin solid black">(Signature over Printed Name)</div>
          <div class="col-2">Employee/Applicant</div>
          <div class="col-3">Date: <span class="text-weight-bold" style="text-decoration: underline">{{ today }}</span></div>
        </div>
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
.border-black {
  border: thin solid black;
}

.label-max-width {
  min-width:80px;
}
</style>

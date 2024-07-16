import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {api} from "boot/axios";
import {logError, splitStringWithParentheses} from "src/f-utils";

export const usePlantillaStore = defineStore("plantilla", () => {

  const config = {
    headers : { 'Content-Type': 'multipart/form-data' },
  }

  // region STATES -----------------------------------------------------------------------------------------------------
  const hasExpired = ref(true);
  const offices = ref([])
  const openedPositions = ref([])
  const prospectPositions = ref([])
  const maxProspectOrder = computed(() => {
    let initialValue = 2
    prospectPositions.value.forEach((item) => {
      const order = parseInt(item['order'])
      if (initialValue < order) initialValue = order
    })
    return initialValue
  })
  const minProspectOrder = computed(() => {
    let initialValue = maxProspectOrder.value
    prospectPositions.value.forEach((item) => {
      const order = parseInt(item['order'])
      if (initialValue > order && order !== 1) initialValue = order
    })
    return initialValue
  })

  const applicationPositions = ref([])
  const workExperiences = ref([])

  const workExperienceInformation = ref([])
  const qualifications = ref({})
  const organization = ref({})
  const salaryGrade = ref('')

  const indexedPositions = ref([])
  // endregion ---------------------------------------------------------------------------------------------------------

  // region MAPPERS ----------------------------------------------------------------------------------------------------
  const mapToOffices = (raw) => raw
    .map((office) => ({id: office['officeid'], name: office['officename']}))
    .sort((a, b) => a.name.localeCompare(b.name))
  const mapToOpenedPositions = (raw) => raw
    .map((item) => {
      const { itemno: itemNumber, id, positionid: infoId, position: name, officeid: officeId } = item
      const whereOfficeId = office => office.id === officeId
      return {
        itemNumber, id, infoId, name, officeId,
        officeName: offices.value.find(whereOfficeId)?.name || 'failed to load office',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name))
  const mapToProspectPositions = (raw) => raw
    .filter((item) => item['IsDelete'] === '0')
    .map((item) => {
      const { ID: id, structuredetailsID: positionId, status, positionapplied: name, Remarks: remarks, ordr: order } = item
      // region SIDE EFFECT
      if (order > maxProspectOrder.value) maxProspectOrder.value = parseInt(order)
      if (order > minProspectOrder.value && minProspectOrder.value === 1) minProspectOrder.value = parseInt(order)
      // endregion
      const whereId = position => position.id === positionId
      const position = openedPositions.value.find(whereId)
      const whereOfficeId = office => office.id === position?.officeId
      const office = offices.value.find(whereOfficeId)
      return ({
        id, status, name, remarks, positionId, order,
        office: office?.name || 'failed to load office',
        itemNumber: position?.itemNumber || 'NaN',
        infoId: position?.infoId || 'failed to load position',
      });
    })
    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
  const mapToApplicationPositions = (raw) => raw
    .map((item) => {
      const { Position: name, Office: office, SG: salaryGrade, ItemNo: plantillaId } = item
      const [ title, subtitle ] = splitStringWithParentheses(name)
      return { title, subtitle , office, salaryGrade, plantillaId }
    })
  const mapToWorkExperiences = (raw) => raw
    .map((item) => {
      const {
        ID: id, Position: position, status, officeName: office,
        Supervisor: supervisor, Organization: location,
        DurationFrom: durationFrom, DurationTo: durationTo,
      } = item
      return {
        // durationFrom: (isDate) => isDate? parseDate(DurationFrom): DurationFrom,
        id, durationFrom, durationTo, position, status, office, supervisor, location,
        accomplishments: item['Accomplishments'], duties: item['Duties'],
      }
    }).sort((a, b) => {
      const aDate = new Date(a.durationFrom)
      const bDate = new Date(b.durationFrom)
      return bDate - aDate;
    })
  const mapToWorkExperienceInformation = (raw, id, type) => (raw
    .find((item) => item['ID'] === id)[type])
    .sort((a, b) => parseInt(a['ID']) - parseInt(b['ID']))
  const mapToIndexedPositions = (raw) => raw
    .sort((a, b) => a['Position'].localeCompare(b['Position']))
    .map((item, index) => ({id: index, name: item['Position'].trim().toUpperCase()}))
  // endregion ---------------------------------------------------------------------------------------------------------

  // region GETTERS ----------------------------------------------------------------------------------------------------
  const countApplicationPositions = computed(() => {
    const temp = applicationPositions.value.filter(obj => obj['status'] !== 'UNQUALIFIED')
    return prospectPositions.value.filter(obj => obj['status'] !== 'UNQUALIFIED')?.length ?? 0
  })
  // endregion ---------------------------------------------------------------------------------------------------------

  // region ACTIONS ----------------------------------------------------------------------------------------------------
  async function getOrganizationalData (onFailure = logError) {
    try {
      const response = await api.get('/plantilla.php')
      offices.value = mapToOffices(response.data['office'])
      openedPositions.value = mapToOpenedPositions(response.data['position'])
    } catch (error) { onFailure(error) }
  }

  async function getProspectPositions (controlno, onFailure = logError) {
    try {
      const response = await api.post('/appliedpositions.php', { controlno }, config)
      prospectPositions.value = mapToProspectPositions(response.data['Positions'])
    } catch (error) { onFailure(error) }
  }

  async function getApplicationPositions (controlno, onFailure = logError) {
    try {
      const response = await api.post('/application.php', { controlno }, config)
      applicationPositions.value = mapToApplicationPositions(response.data['application'])
    } catch (error) { onFailure(error) }
  }

  async function createProspectPosition (userInput, onSuccess, onFailure = logError) {
    try {
      const response = await api.post('/applyposition.php', userInput, config)
      onSuccess(response.data)
    } catch (error) { onFailure(error) }
  }

  async function deleteProspectPosition (id, onFailure = logError) {
    try {
      const response = await api.post('/deleteapplied.php', { id }, config)
    } catch (error) { onFailure(error) }
  }

  async function reorderProspectPosition (controlno, type, order, id, onSuccess, onFailure = logError) {
    try {
      const response = await api.post('ApplicationOrder.php', {
        controlno, type, order, id,
      }, config)
      onSuccess(response.data)
    } catch (e) { onFailure(e) }
  }

  async function getWorkExperiences (controlno, onFailure = logError) {
    try {
      const response = await api.post('/wesget.php', { controlno }, config)
      workExperiences.value = mapToWorkExperiences(response.data['WES'])
    } catch (error) { onFailure(error) }
  }

  async function getWorkExperienceInformation (id, controlno, isDuties = false, onFailure = logError) {
    try {
      const response = await api.post('/wesget.php', { controlno }, config)
      const infoType = !isDuties ? 'Accomplishments' : 'Duties'
      workExperienceInformation.value = mapToWorkExperienceInformation(response.data['WES'], id, infoType)
    } catch (error) { onFailure(error) }
  }

  async function createWorkExperience (payload, onSuccess, onFailure = logError) {
    const { controlno, durationFrom, durationTo, position, status, office, supervisor, location  } = payload
    try {
      const response = await api.post('/wessaveedit.php', {
        controlno, supervisor, position, status: !status? 'PERMANENT': status,
        type: 'ADD', officename: office, organization: location,
        durationfrom: durationFrom || 'Present', durationto: durationTo,
      }, config) // api.post
      onSuccess(response.data)
    } catch (error) { onFailure(error) }
  }

  async function deleteWorkExperience (id,  onFailure = logError) {
    try {
      const response = await api.post('/wessaveedit.php', { type: 'DELETE', id }, config)
    } catch (error) { onFailure(error) }
  }

  async function updateWorkExperience (payload, onSuccess,  onFailure = logError) {
    const { controlno, durationFrom, durationTo, position, status, office, supervisor, location, id } = payload
    try {
      const response = await api.post('/wessaveedit.php', {
        controlno, supervisor, position, status,
        type: 'EDIT', officename: office, organization: location,
        durationfrom: durationFrom || 'Present', durationto: durationTo,
        id,
      }, config) // api.post
      onSuccess(response.data)
    } catch (error) { onFailure(error) }
  }

  async function createWorkExperienceInformation (isDuties, wesid, str, onFailure = logError) {
    const formData = { wesid, type: 'ADD' }
    const infoType = !isDuties ? 'accomplishment': 'duties'
    formData[infoType] = str
    try {
      const response = await api.post(`/wes${infoType}.php`, formData, config)
    } catch (error) { onFailure(error) }
  }

  async function deleteWorkExperienceInformation (isDuties, id, onFailure = logError) {
    try {
      const response = await api.post(`/wes${!isDuties?'accomplishment':'duties'}.php`,
        { id, type: 'DELETE' }, config)
    } catch (error) { onFailure(error) }
  }

  async function getPositionInformation (positionid, id, onFailure = logError) {
    try {
      const response = await api.post('/positionqs.php', { positionid, id }, config)
      const { Education: education, Training: training, Experience: experience, Eligibility: eligibility } = response.data['QS'][0]
      const { officename: office, groupname: group, divisionname: division, section, unitname: unit, SG } = response.data['OfficeDetails'][0]
      organization.value = { office, group, division, section, unit }
      salaryGrade.value = SG
      qualifications.value = { education, training, experience, eligibility }
    } catch (error) { onFailure(error) }
  }

  async function getIndexedPositions (onFailure = logError) {
    try {
      const response = await api.get('/IOSPositions.php')
      indexedPositions.value = mapToIndexedPositions(response.data['IOS_positions'])
    } catch (error) { onFailure(error) }
  }

  async function getIsPublishPeriod (onFailure = logError) {
    try {
      const { data } = await api.get('/validity.php')
      hasExpired.value =  !data.includes('0') // 1 = expired, 0 = not expired
    } catch (error) { onFailure(error) }
  }

  return {
    hasExpired,
    offices,
    openedPositions,
    prospectPositions,
    maxProspectOrder, minProspectOrder,
    applicationPositions,
    indexedPositions,
    salaryGrade,
    organization,
    qualifications,
    workExperiences,
    workExperienceInformation,
    countApplicationPositions,
    getOrganizationalData,
    getProspectPositions,
    getApplicationPositions,
    getWorkExperiences,
    getWorkExperienceInformation,
    createProspectPosition,
    deleteProspectPosition,
    reorderProspectPosition,
    createWorkExperience,
    deleteWorkExperience,
    updateWorkExperience,
    createWorkExperienceInformation,
    deleteWorkExperienceInformation,
    getPositionInformation,
    getIndexedPositions,
    getIsPublishPeriod,
  }
}, { persist: true });

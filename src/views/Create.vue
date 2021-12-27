<template>
  <div class="create"> 
    <div v-if="title != ''"
         :class="'flex w-full max-w-sm space-x-3 mx-auto bg-cover bg-center bg-secondary ring-4 rounded-lg text-primary shadow-md p-4 ring-' + [color] + '-300 dark:ring-' + [color] + '-400'"
         :style="'background-image: url(' + imgUrl + ')'">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <div class="flex flex-wrap">
              <div
                class="mr-1"
                v-for="tagi in tags"
                :key="tagi"
              >
                <span :class="'py-1 px-2 my-1 rounded-lg cursor-pointer mx-1 bg-' + [color] + '-300 dark:bg-' + [color] + '-500'">#{{ tag.substring(0, 8) }}</span>
              </div>
            </div>
          </div>
          <div class="">
            <h3 v-if="title.length < 15" class="py-4 mb-1 text-2xl font-semibold"><span class="px-3 pt-1 pb-2 bg-white rounded-lg bg-opacity-80 dark:bg-gray-700">{{ title }}</span></h3>
            <h3 v-else class="px-3 py-4 pt-1 pb-2 mb-1 text-2xl font-semibold bg-white rounded-lg bg-opacity-80 dark:bg-gray-700">{{ title }}</h3>
            <p v-if="snippet" class="mb-3 mr-1 text-md "><span class="px-3 py-1 bg-white rounded-md bg-opacity-60 dark:bg-gray-700">{{ snippet }}</span></p>
          </div>
        </div>
    </div>
    <form @submit.prevent="handleSubmit" class="flex w-full max-w-sm mx-auto space-x-3">
      <div class="w-full max-w-2xl px-5 py-10 m-auto mt-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <div class="mb-6 text-3xl font-light text-center text-primary">
              Create an event
          </div>
          <div class="grid max-w-xl grid-cols-2 gap-3 m-auto">
              <!-- TITRE -->
              <div class="col-span-2">
                  <label class="text-primary">Title</label>
                  <input  type="text" 
                          v-model="title"
                          required
                          id="event-form-title" 
                          class="flex-1 w-full px-4 py-2 my-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Title of the event"/>
              </div>
              <!-- IMAGE -->
              <div class="grid-span-2">
                <label class="text-primary">Illustration</label>
                <input  type="file"
                        @change="onFileChange"
                        id="img" 
                        name="img"
                        accept="image/png, image/jpeg"
                        class="my-2 text-primary">
              </div>
              <!-- COLOR -->
              <div class="col-span-2">
                <label class="text-primary" for="color">
                  Color
                <select class="block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm text-primary bg-secondary focusxoutline-none focus:ring-blue-500 focus:border-blue-500"
                        v-model="color"
                        required
                        name="color">
                    <option value="">
                        Select a color
                    </option>
                    <option value="red">
                        Red
                    </option>
                    <option value="yellow">
                        Yellow
                    </option>
                    <option value="green">
                        Green
                    </option>
                    <option value="blue">
                        Blue
                    </option>
                    <option value="indigo">
                        Indigo
                    </option>
                    <option value="purple">
                        Purple
                    </option>
                    <option value="pink">
                        Pink
                    </option>
                </select>
                </label>
              </div>
              <!-- DATE -->
              <div class="col-span-2">
                <label class="text-primary">Date and time</label>
                <div class="flex mt-2">
                  <!-- https://litepie.com/#get-started -->
                  <litepie-datepicker
                    overlay
                    as-single
                    :formatter="formatter"
                    v-model="date"
                  ></litepie-datepicker>
                </div>
              </div>
              <!-- TIME -->
              <div class="col-span-1">
                <input  type="text" 
                          v-model="time.hours"
                          required
                          id="event-form-hours" 
                          class="flex-1 w-full px-4 py-2 text-base text-center placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="HH"/>
              </div>
              <div class="col-span-1">
                <input  type="text" 
                          v-model="time.minutes"
                          required
                          id="event-form-minutes" 
                          class="flex-1 w-full px-4 py-2 text-base text-center placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="MM"/>
              </div>
              <!-- CAMPUS LOCATION -->
              <div class="col-span-2">
                  <label class="text-primary" for="color">
                    Campus
                  <select class="block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm text-primary bg-secondary focusxoutline-none focus:ring-blue-500 focus:border-blue-500"
                          v-model="campusId"
                          required
                          name="campus"
                          @click="schoolId = ''; schools = {}">
                      <option value="">
                          Select a campus
                      </option>
                      <option v-for="location in locations" :key="location.id" :value="location.id">
                          {{ location.name }}
                      </option>
                  </select>
                  </label>
              </div>
              <!-- SCHOOL -->
              <div v-if="campusId" class="col-span-2">
                  <label class="text-primary" for="color">
                    School
                  <select class="block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm text-primary bg-secondary focusxoutline-none focus:ring-blue-500 focus:border-blue-500"
                          v-model="schoolId"
                          required
                          name="school"
                          @click="loadSchools(campusId)">
                      <option value="">
                          Select a school
                      </option>
                      <option v-for="school in schools" :key="school.id" :value="school.id">
                          {{ school.name }}
                      </option>
                  </select>
                  </label>
              </div>
              <!-- LOCATION -->
              <div class="col-span-2">
                  <label class="text-primary">Location</label>
                  <input  type="text" 
                          v-model="placename"
                          required
                          id="event-form-placename" 
                          class="flex-1 w-full px-4 py-2 mt-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Name of the place"/>
              </div>
              <div class="col-span-2">
                  <input  type="text" 
                          v-model="address"
                          required
                          id="event-form-address" 
                          class="flex-1 w-full px-4 py-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Address"/>
              </div>
              <div class="col-span-1">
                  <input  type="text" 
                          v-model="city"
                          required
                          id="event-form-city" 
                          class="flex-1 w-full px-4 py-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="City"/>
              </div>
              <div class="col-span-1">
                  <input  type="text" 
                          v-model="zip"
                          required
                          id="event-form-zip" 
                          class="flex-1 w-full px-4 py-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Zipcode"/>
              </div>
              <div class="col-span-2">
                  <input  type="text" 
                          v-model="notes"
                          required
                          id="event-form-notes" 
                          class="flex-1 w-full px-4 py-2 mb-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Useful additional address details"/>
              </div>
              <!-- DETAILS -->
              <div class="col-span-2">
                  <label class="text-primary" for="details">
                      Details
                      <textarea v-model="body"
                                required
                                class="flex-1 w-full px-4 py-2 my-2 text-base placeholder-gray-400 border border-gray-300 rounded-lg appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                                id="details" 
                                placeholder="Give details about the event" 
                                name="details" 
                                rows="5" 
                                cols="40">
                      </textarea>
                  </label>
              </div>
              <!-- TAGS -->
              <div class="col-span-2">
                <label class="text-primary">Tags (hit enter to add a tag):</label>
                <input
                  @keydown.enter.prevent="handleKeydown"
                  v-model="tag"
                  type="text"
                  placeholder="Enter a tag"
                  class="flex-1 w-full px-4 py-2 mt-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
              </div>
              <div class="col-span-2 text-center">
                  <button class="w-full px-4 py-2 mt-6 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                      Save
                  </button>
              </div>
          </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { projectFirestore, timestamp, storage, storageRef } from "../firebase/config";
import { useRouter } from "vue-router";
import LitepieDatepicker from 'litepie-datepicker';
import getLocations from "@/composables/getLocations";
import getSchools from "@/composables/getSchools"

export default {
  components:{
      LitepieDatepicker
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const title = ref("");
    // DATE
    const date = ref([]);
    const formatter = ref({
      date: 'DD/MM/YYYY',
      month: 'MMM'
    })
    // TIME
    const time = ref({ 
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
    });
    // CAMPUS
    const { locations, locationsError, loadLocations } = getLocations();
    const campusId = ref("");
    const campus = computed(() => {
      if(campusId.value != "") {
        return {
          id: campusId.value,
          name: locations.value.find(element => element.id == campusId.value).name
        }
      } else return {};
    });
    loadLocations();
    // SCHOOL
    const { schools, schoolsError, loadSchools } = getSchools();
    const schoolId = ref("");
    const school = computed(() => {
      if(campusId.value && schoolId.value) {
        return {
          id: schoolId.value,
          name: schools.value.find(element => element.id == schoolId.value).name
        }
      } else return {};
    });
    // LOCATION
    const placename = ref("");
    const address = ref("");
    const city = ref("");
    const zip = ref("");
    const notes = ref("");
    const location = computed(() => {
      return {
        placename: placename.value,
        address: address.value,
        city: city.value,
        zip: zip.value,
        notes: notes.value,
      }
    });
    const imgUrl = ref("");
    const color = ref("blue");
    const body = ref("");
    const tags = ref([]);
    const tag = ref("");
    const router = useRouter();
    const snippet = computed(() => {
      if (body.value.length > 30) {
        return body.value.substring(0, 30) + '...';
      } else {
        return body.value;
      }
    });

    // from FB doc, store a file https://firebase.google.com/docs/storage/web/upload-files#web-version-8_1
    // console.log(storage);
    // var imgRef = storage.ref();
    // .child('events-posts');

    if (!user.value.loggedIn) {
      router.push({ name: "Home" });
    }

    // // Create file metadata including the content type
    // /** @type {any} */
    // const metadata = {
    //   contentType: 'image/jpeg',
    // };

    // https://codepen.io/Atinux/pen/qOvawK/
    const onFileChange = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      var file = files[0];
      if (!files.length)
        return;
        
      // 'file' comes from the Blob or File API
      const fileName = file.name;
      /** @type {any} */
      const metadata = {
        contentType: file.type,
      };
      const storageFolder = 'events-posts/';
      const storageRef = storage.ref(storageFolder + fileName);
      storageRef.put(file, metadata).then((snapshot) => {
        storageRef.getDownloadURL()
        .then((url) => {
          imgUrl.value = url;
          // console.log(url);
        });
      });
    }

    const handleKeydown = () => {
      if (!tag.value.trim()) {
        return;
      }
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

    const handleSubmit = async () => {
      const event = {
        title: title.value.substring(0, 8),
        date: date.value,
        time: time.value,
        campus: campus.value,
        school: school.value,
        location: location.value,
        img_url: imgUrl.value,
        color: color.value,
        body: body.value,
        tags: tags.value,
        createdAt: timestamp(),
        displayName: user.value.data.displayName,
        authorId: user.value.data.uid,
      };
      const res = await projectFirestore.collection("event").add(event);
      router.push({ name: "Events" });
    };

    return { body, snippet, title, date, formatter, time,
             locations, locationsError, campusId,
             schools, schoolsError, loadSchools, schoolId, school,
             placename, address, zip, city, notes,
             imgUrl, color, tag, tags, onFileChange, handleKeydown, handleSubmit };
  },
};
</script>

<style scoped>

.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>

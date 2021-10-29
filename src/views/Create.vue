<template>
  <div class="create"> 
    <div v-if="title != ''"
         :class="'flex w-full max-w-sm space-x-3 mx-auto bg-cover bg-center bg-secondary ring-4 rounded-lg text-primary shadow-md p-4 ring-' + [color] + '-300 dark:ring-' + [color] + '-400'"
         :style="'background-image: url(' + imgUrl + ')'">
      <div class="grid grid-flow-col auto-cols-max md:auto-cols-min gap-4">
        <div class="">
          <div class="flex flex-col flex-wrap">
            <div
              class="m-1"
              v-for="tagi in tags"
              :key="tagi"
            >
              <span :class="'py-1 px-2 rounded-lg cursor-pointer bg-' + [color] + '-300'">#{{ tagi.substring(0, 8) }}</span>
            </div>
          </div>
        </div>
        <div class="">
          <h3 class="text-2xl font-semibold py-4 mb-1 truncate"><span class="bg-white bg-opacity-80 dark:bg-gray-700 px-3 pt-1 pb-2 rounded-lg">{{ title }}</span></h3>
          <p class="mb-3 mx-1 text-md "><span class="bg-white bg-opacity-60 dark:bg-gray-700 px-3 py-1 rounded-lg">{{ snippet }}</span></p>
        </div>
      </div>
    </div>
    <form @submit.prevent="handleSubmit" class="flex w-full max-w-sm space-x-3 mx-auto">
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
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 my-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Title of the event"/>
              </div>
              <!-- DATETIME -->
              <div class="col-span-2">
                <label class="text-primary">Date and time</label>
                <label class="text-gray-700" for="time">
                    <input type="time" class="appearance-none border border-gray-300 w-full py-2 px-4 mt-2 bg-secondary text-primary placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1" 
                    v-model="time"/>
                </label>
              </div>
              <div class="col-span-2">
                <label class="text-gray-700" for="date">
                    <input type="date" class="appearance-none border border-gray-300 w-full py-2 px-4 mb-2 bg-secondary text-primary placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1" 
                    v-model="date"/>
                </label>
              </div>
              <!-- LOCATION -->
              <div class="col-span-2">
                  <label class="text-primary">Location</label>
                  <input  type="text" 
                          v-model="placename"
                          required
                          id="event-form-placename" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 mt-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Name of the place"/>
              </div>
              <div class="col-span-2">
                  <input  type="text" 
                          v-model="address"
                          required
                          id="event-form-address" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Address"/>
              </div>
              <div class="col-span-1">
                  <input  type="text" 
                          v-model="city"
                          required
                          id="event-form-city" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="City"/>
              </div>
              <div class="col-span-1">
                  <input  type="text" 
                          v-model="zip"
                          required
                          id="event-form-zip" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Zipcode"/>
              </div>
              <div class="col-span-2">
                  <input  type="text" 
                          v-model="notes"
                          required
                          id="event-form-notes" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 mb-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Useful additional address details"/>
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
                <select class="block w-full text-primary py-2 px-3 my-2 border border-gray-300 bg-secondary rounded-md shadow-sm focusxoutline-none focus:ring-primary-500 focus:border-primary-500"
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
              <!-- DETAILS -->
              <div class="col-span-2">
                  <label class="text-primary" for="details">
                      Details
                      <textarea v-model="body"
                                required
                                class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 my-2 bg-secondary text-primary placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
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
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 mt-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
              </div>
              <div class="col-span-2 text-center">
                  <button class="py-2 px-4 mt-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
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

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const title = ref("");
    // DATETIME
    const dateObj = ref(new Date);
    const time = computed({
      get: () => dateObj.value.toLocaleTimeString('fr-FR'),
      set: val => {
        console.log(val);
      }
    })
    const date = computed({
      get: () => dateObj.value.toISOString().replace(/T.*/,'').split('-').join('-'),
      set: val => {
        console.log(val);
      }
    })
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
      return body.value.substring(0, 50);
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
        datetime: dateObj.value,
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
      router.push({ name: "Home" });
    };

    return { body, snippet, title, time, date, 
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

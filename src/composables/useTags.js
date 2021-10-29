import { ref } from "vue";

const useTags = (event) => {
  const tags = ref([]);
  const tagSet = new Set();

  event.forEach((item) => {
    item.tags.forEach((tag) => tagSet.add(tag));
  });

  tags.value = [...tagSet];
  return { tags };
};

export default useTags;

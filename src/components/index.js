import swmmingFish from './swimming-fish/index.vue'
const components = {
    swmmingFish
};
function install(Vue) {
    const keys = Object.keys(components);
    keys.forEach((name) => {
        const component = components[name];
        Vue.component(component.name || name, component);
    });
}

export default {
    install,
    ...components,
};

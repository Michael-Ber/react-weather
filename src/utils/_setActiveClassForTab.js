const findItem = (item, elemClass) => {
    if (item.classList.contains(elemClass)) {
        return item
    }
    return findItem(item.parentNode, elemClass)
}
const removeActive = (item, listClass, activeClass) => {
    const allItems = findItem(item, listClass);
    return Array.from(allItems.children).forEach(li => li.classList.remove(activeClass))
}

export const setActiveClassForTab = (item, listClass, itemClass, activeClass) => {
    
    removeActive(item, listClass, activeClass);
    return findItem(item, itemClass).classList.add(activeClass)
}
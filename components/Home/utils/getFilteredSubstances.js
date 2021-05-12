const getFilteredSubstances = (data, filter, selectedClass) => {
  const arr = data || [];
  const lowerCaseFilter = filter.toLowerCase().trim();
  if (filter) {
    return arr.filter(
      (sub) =>
        sub.name.toLowerCase().includes(lowerCaseFilter) ||
        (sub.class &&
          Object.values(sub.class).some(
            (_class) =>
              Array.isArray(_class) &&
              _class.some((__class) =>
                __class.toLowerCase().includes(lowerCaseFilter)
              )
          ))
    );
  } else if (selectedClass) {
    return arr.filter((sub) =>
      Object.values(sub?.class || {}).some((classList) =>
        classList?.includes(selectedClass)
      )
    );
  }
  return arr;
};

export default getFilteredSubstances;

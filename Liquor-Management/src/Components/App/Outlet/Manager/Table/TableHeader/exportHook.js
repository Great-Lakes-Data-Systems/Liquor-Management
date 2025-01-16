const onExportClick = async (itemsData) => {
  // TODO: Enable value separator chooser
  try { 
    const fileBlob = new Blob([itemsData],{type: 'text/csv'});
    const opts = {
      types: [
        {
          description: 'csv file',
          accept: {'text/csv':['.csv']}
        }
      ],
      startIn: 'downloads',
      suggestedName: 'Liquor_Items'
    };
    let handle = await showSaveFilePicker(opts);
    let writable = await handle.createWritable();
    await writable.write(fileBlob);
    writable.close();
  } catch (error) {
    console.error(`export error - ${error.message}`);
  }
};

export default onExportClick;
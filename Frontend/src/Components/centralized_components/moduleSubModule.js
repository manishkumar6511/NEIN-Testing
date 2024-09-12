const moduleSubDivisions = {
    'ff': [
      { label: 'Air Export', value: 'AirExport' },
      { label: 'Air Import', value: 'AirImport' },
      { label: 'Ocean Export', value: 'OceanExport' },
      { label: 'Ocean Import', value: 'OceanImport' }
    ],
    'cha': [
      { label: 'Air Export', value: 'AirExport' },
      { label: 'Air Import', value: 'AirImport' },
      { label: 'Ocean Export', value: 'OceanExport' },
      { label: 'Ocean Import', value: 'OceanImport' }
    ],
    'removals': [
    
      { label: 'Air Export', value: 'AirExport' },
      { label: 'Air Import', value: 'AirImport' },
      { label: 'Ocean Export', value: 'OceanExport' },
      { label: 'Ocean Import', value: 'OceanImport' },
      { label: 'Domestic', value: 'Domestic' },
    ]
  };
  
  // Define module options for the first dropdown
  const moduleOptions = [
    { label: 'Freight Forwarding', value: 'ff' },
    { label: 'Custom Brokerage', value: 'cha' },
    { label: 'Removals', value: 'removals' }
  ];
  export { moduleSubDivisions, moduleOptions };
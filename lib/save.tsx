import EditorsHelper from "./ReactEditor";

(function () {
  if ((window as any).LiuSynthethicsTrendingPluginNuclearReactor === undefined) {
    console.info('LiuSynthethicsTrendingPluginNuclearReactor not found, creating');
    (window as any).LiuSynthethicsTrendingPluginNuclearReactor = function (
      blockId: string
    ) {
      const React = window.React as unknown as typeof import("react");
      const ReactDOM = window.ReactDOM;
      const renderPlant = document.getElementById(`loop-list-1`);

      if (renderPlant) {
        //@ts-ignore
        console.log('found render plant' , renderPlant);
                //@ts-ignore
        const renderPlanted = ReactDOM.createRoot(renderPlant);

        renderPlanted.render(<EditorsHelper/>);
      }
    };
  }
})();

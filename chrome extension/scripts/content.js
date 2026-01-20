console.log(" Weaverse Navigator loaded!");

function getDisplayname(click){
  const componentElement = click.closest('[data-id]');

  const titleElement = componentElement.querySelector('[title]');
  return titleElement.getAttribute('title');
}

function replaceName(displayName){
  return displayName.toLowerCase().replace(/\s+/g,'-');
}

function getProjectID(){
  const url = window.location.pathname;
  
  const projectID = url.split('/');
  if(projectID[1] === 'projects' && projectID[2]){
    return projectID[2];
  }

  return null;

}

document.addEventListener("click", (e) => {
  if(e.ctrlKey || e.metaKey){
    const displayName = getDisplayname(e.target);

    if(displayName){
      const normalized = replaceName(displayName);
      const projectID = getProjectID();

      console.log('Display Name:', displayName);
      console.log('Normalized:', normalized);
      console.log('Project ID:', projectID);

      // Send Message Native Host
      //chrome.runtime.sendMessage(message, responseCallback?)
      chrome.storage.local.get(['projectPath'], (result) => {
        const projectPath = result.projectPath;
        console.log('Project Path:', projectPath);
        
        chrome.runtime.sendMessage({
          action: 'openFile',
          displayName: normalized,
          projectId: projectID,
          projectPath: projectPath
        });
      });
    }
  }

});

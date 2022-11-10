looker.plugins.visualizations.add({
    // Id and Label are legacy properties that no longer have any function besides documenting
    // what the visualization used to have. The properties are now set via the manifest
    // form within the admin/visualizations page of Looker
    id: "hello_world",
    label: "Hello World",
    options: {
      font_size: {
        type: "string",
        label: "Font Size",
        values: [
          {"Large": "large"},
          {"Small": "small"}
        ],
        display: "radio",
        default: "large"
      }
    },
    // Set up the initial state of the visualization
    create: function(element, config) {
  
      // Insert a <style> tag with some styles we'll use later.
      element.innerHTML = `
        <style>
          .hello-world-vis {
            /* Vertical centering */
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            overflow-x: auto;
          }
          .hello-world-text-large {
            width: 50%;
            position: relative;
            top: 50%;
            text-align: right;
            font-size: 72px;
          }
          .hello-world-text-small {
            width: 50%;
            position: relative;
            top: 50%;
            text-align: right;
            font-size: 18px;
          }
  
          .icon-container {
            width: 50%;
            position: relative;
            top: 50%;
            text-align: left;
    
          }
        </style>
      `;
  
      // Create a container element to let us center the text.
      var container = element.appendChild(document.createElement("div"));
      container.className = "hello-world-vis";
  
      // Create an element to contain the text.
      this._textElement = container.appendChild(document.createElement("div"));
      
      this._symbolContainer = container.appendChild(document.createElement("div"));
      
    },
    // Render in response to the data or settings changing
    updateAsync: function(data, element, config, queryResponse, details, done) {
  
      // Clear any errors from previous updates
      this.clearErrors();
  
      // Throw some errors and exit if the shape of the data isn't what this chart needs
      if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
      }
  
      // Grab the first cell of the data
      var myNumber = data[0]["joinv4.count"];
  
      // Insert the data into the page
      this._textElement.innerHTML = myNumber.value;
      this._symbolContainer.innerHTML = "<span style='position: relative; font-size: 55px; color: rgb(42, 170, 82);'>&#9792;</span>";
      this._symbolContainer.className = "icon-container";
      
      // Set the size to the user-selected size
      if (config.font_size == "small") {
        this._textElement.className = "hello-world-text-small";
      } else {
        this._textElement.className = "hello-world-text-large";
      }
  
      // We are done rendering! Let Looker know.
      done()
    }
  });
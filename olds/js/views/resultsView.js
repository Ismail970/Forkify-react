import View from "./View";
import previewView from "./previewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = 'No recepies for your query! Please try something else';
  _message = "";

  _generateMarkup () {
    return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();
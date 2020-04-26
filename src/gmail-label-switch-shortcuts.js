/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

{
  function collectLabels() {
    const h2s = document.getElementsByTagName('h2');
    var labelH2;
    for (const h2 of h2s) {
      if (h2.innerText === 'Labels') {
        labelH2 = h2;
        break;
      }
    }
    const labelDiv = labelH2.nextSibling;
    const divsUnderLabels = labelDiv.getElementsByTagName('div');
    const results = [];
    for (const div of divsUnderLabels) {
      if (div.attributes['data-tooltip'] !== undefined) {
        results.push(div);
      }
    }
    return results;
  }

  function getSelectedIndex(labels) {
    var maxIndex = -1;
    var maxCount = 0;
    for (var index = 0; index < labels.length; index++) {
      const label = labels[index];
      const count = label.classList.length;
      if (count > maxCount) {
        maxIndex = index;
        maxCount = count;
      }
    }
    if (maxCount > 1) {
      return maxIndex;
    } else {
      return -1;
    }
  }

  function getCollapseState(label) {
    const divsInsideLabel = label.getElementsByTagName('div');
    for (const div of divsInsideLabel) {
      const roleAttribute = div.attributes['role'];
      if (roleAttribute && roleAttribute.value === 'link') {
        const title = div.title;
        if (title.startsWith('Collapse')) {
          return 'expanded';
        } else if (title.startsWith('Expand')) {
          return 'collapsed';
        } else {
          console.warn('Unexpected collapse state for', div);
        }
      }
    }
    return 'normal';
  }

  function selectNextLabel(direction) {
    const labels = collectLabels();
    var index = getSelectedIndex(labels);
    if (index === -1) {
      console.log('No label selected, so selecting first.');
      labels[0].click();
      return;
    }
    function go() {
      switch (direction) {
      case 'up':
        index += 1;
        break;
      case 'down':
        index -= 1;
        break;
      default:
        throw 'invariant violation';
      }
      if (index < 0) {
        index = labels.length - 1;
      } else if (index >= labels.length) {
        index = 0;
      }
      const newLabel = labels[index];
      const collapseState = getCollapseState(newLabel);
      switch (collapseState) {
      case 'normal':
        labels[index].click();
        break;
      case 'expanded':
        go();
        break;
      case 'collapsed':
        labels[index].click();
        setTimeout(() => { selectNextLabel(direction); }, 0);
        break;
      default:
        throw 'invariant violation';
      }
    }
    go();
  }

  document.addEventListener('keypress', ev => {
    if (ev.key === 'J') {
      selectNextLabel('up');
      ev.stopPropagation();
    } else if (ev.key === 'K') {
      selectNextLabel('down');
      ev.stopPropagation();
    }
  });
}

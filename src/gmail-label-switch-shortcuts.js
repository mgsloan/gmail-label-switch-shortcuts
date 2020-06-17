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
  document.addEventListener('keypress', ev => {
    const element = ev.target || ev.srcElement;
    const targetIsInput =
          element.tagName == 'INPUT' ||
          element.tagName == 'SELECT' ||
          element.tagName == 'TEXTAREA' ||
          element.isContentEditable;
    if (targetIsInput) {
      return;
    } else if (ev.key === 'J') {
      selectNextLabel('up');
      ev.stopPropagation();
    } else if (ev.key === 'K') {
      selectNextLabel('down');
      ev.stopPropagation();
    }
  });

  function selectNextLabel(direction) {
    const labels = collectLabels();
    var index = getSelectedIndex(labels);
    if (index === -1) {
      switch (direction) {
      case 'up':
        console.log('No label selected, so selecting last.');
        labels[labels.length - 1].click();
        return;
      case 'down':
        console.log('No label selected, so selecting second.');
        if (labels.length > 1) {
          labels[1].click();
        } else {
          labels[0].click();
        }
        return;
      default:
        throw 'invariant violation';
      }
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

  function findLabelsDiv() {
    const h2s = document.getElementsByTagName('h2');
    var labelH2 = null;
    for (const h2 of h2s) {
      if (h2.innerText === 'Labels') {
        labelH2 = h2;
        break;
      }
    }
    return labelH2 ? labelH2.nextSibling : null;
  }

  function collectLabels() {
    const labelsDiv = findLabelsDiv()
    const divsUnderLabels = labelsDiv.getElementsByTagName('div');
    const results = [];
    for (const div of divsUnderLabels) {
      if (div.attributes['data-tooltip'] !== undefined &&
         !div.innerText.startsWith('Drafts') &&
         div.style.display !== 'none') {
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
}

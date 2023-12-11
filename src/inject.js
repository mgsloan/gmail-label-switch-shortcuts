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

const browser = window.browser || window.chrome;
function inject(scriptName) {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', browser.runtime.getURL(scriptName));
  // In testing doesn't seem to be necessary, but may lead to more
  // predictable execution order.
  scriptEl.setAttribute('defer', 'defer');
  document.getElementsByTagName('body')[0].appendChild(scriptEl);
}

inject('gmail-label-switch-shortcuts.js');

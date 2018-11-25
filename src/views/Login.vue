<template>
	<div>
		<section class="header">
			<svg class="shrine-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#000000">
				<g id="XMLID_2_">
					<g id="XMLID_4_">
						<path id="XMLID_5_" d="M17,2H7L2,6.62L12,22L22,6.62L17,2z M16.5,3.58l3.16,2.92H16.5V3.58z M7.59,3.5H15v3H4.34L7.59,3.5z     M11.25,18.1L7.94,13h3.31V18.1z M11.25,11.5H6.96L4.69,8h6.56V11.5z M16.5,12.32 M12.75,18.09V8h6.56L12.75,18.09z"/>
					</g>
					<rect id="XMLID_1_" fill="none" width="24" height="24"/>
				</g>
			</svg>
			<h1>SHRINE</h1>
		</section>

		<form>
			<div class="mdc-text-field mdc-text-field--box username">
				<input type="text" class="mdc-text-field__input" id="username-input" name="username" required>
				<label class="mdc-floating-label" for="username-input">Username</label>
				<div class="mdc-line-ripple"></div>
			</div>
			<div class="mdc-text-field mdc-text-field--box password">
				<input type="password" class="mdc-text-field__input" id="password-input" name="password" required minlength="8">
				<label class="mdc-floating-label" for="password-input">Password</label>
				<div class="mdc-line-ripple"></div>
			</div>
			<div class="button-container">
				<button type="button" class="mdc-button cancel">
					Cancel
				</button>
				<button class="mdc-button mdc-button--raised next">
					Next
				</button>
			</div>
		</form>
	</div>
</template>

<script>
/* eslint no-tabs: 0 */
/* eslint no-new: 0 */
/* eslint max-len: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

export default {
  mounted() {
    new MDCTextField(document.querySelector('.username'));
    new MDCTextField(document.querySelector('.password'));

    new MDCRipple(document.querySelector('.cancel'));
    new MDCRipple(document.querySelector('.next'));
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.shrine-logo {
  width: 150px;
  height: 150px;
  padding-top: 80px;
  fill: currentColor;
}

.username,
.password {
  display: block;
  width: 300px;
  margin: 20px auto;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 300px;
  margin: auto;
}

.button-container button {
  margin: 3px;
}
</style>

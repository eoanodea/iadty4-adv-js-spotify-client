/**
 * Builds an error message container
 *
 * @param {string} msg - The error message
 */
export const error = (msg) => `
    <div class='error-container' id="error-box">
        <h2>Data Error</h2>
        <p>${msg}</p>
        <button id='retry-error' type="button" class="btn btn-primary">Retry</button>
    </div>
`;

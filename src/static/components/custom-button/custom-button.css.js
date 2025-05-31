export const styles = `
<style>
.custom-btn {
    outline: none;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    height: fit-content;
    min-height: 3rem;
    min-width: 7rem;
    max-width: 10rem;
    text-wrap: wrap;
    width: fit-content;
    background-color: transparent;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
    box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
    border-radius: 5px;
    margin: auto;
    transition: 0.3s all;
}
.custom-btn-selected {
  outline: none;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  min-height: 2.5rem;
  min-width: 7rem;
  width: fit-content;
  background-color: #95a5a6;
  color: white;
  border-radius: 5px;
  margin: auto;
  transition: 0.3s all;
}

.custom-btn-loading {
  outline: none;
  font-size: 0.9rem;
  border: none;
  cursor: default;
  height: fit-content;
  min-height: 3rem;
  min-width: 7rem;
  max-width: 10rem;
  width: fit-content;
  background-color: transparent;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
  box-shadow: 0px 0px 5px 1px rgba(154, 154, 154, 1);
  color: white;
  border-radius: 5px;
  margin: auto;
  transition: 0.3s all;
}

.loader {
  border: 0.2rem solid #f3f3f3;
  border-top: 0.2rem solid cornflowerblue;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  animation: spin 1.5s linear infinite;
  margin: auto;
  padding: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.custom-btn:hover {
  background-color: whitesmoke;
}

</style>
`;
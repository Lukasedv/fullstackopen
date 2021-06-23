import React from 'react'

const PersonForm = (props) => {
    return(
    <div>
    <form onSubmit={props.onSubmit}>
      <div>
        Name 
        <input 
          value={props.name}
          onChange={props.onNameChange}
        />
        </div>
        <div>
        Number
        <input 
          value={props.number}
          onChange={props.onNumberChange}
        />
        </div>
        <button type="submit">save</button> 
      </form>
      </div>
    )
  }

export default PersonForm
import React from "react"
import {Search} from "semantic-ui-react"
import _ from "lodash"

const SearchOrder = (props) => {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [list, setList] = React.useState([])
  const [results, setResults] = React.useState([])

  React.useEffect(() => {
    if(props.delivered.length > 0){
      setList(props.list.filter(listFilter).map(mapList))
    }else{
      setList(props.list.map(mapList))
    }
  }, [props.delivered])

  React.useEffect(() => {
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = (result) => re.test(result.find)
    setLoading(false)
    setResults(_.filter(list, isMatch))
  }, [value]);

  const mapList = (i) => {
    return {
      title: i[1] + " " + i[4],
      description: "Tel " + i[5],
      price: "Período " + i[2],
      find: i[1] + " " + i[4] + " " + i[5],
      raw: i
    }
  }

  const listFilter = (i) => {
    return !props.delivered.includes(i[1].toString())
  }

  const handleSearchChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => props.onSelect(data.result.raw)}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      input={{fluid: true}}
      placeholder="Digite Número, Nome ou Telefone do cliente para buscar"
    />
  )

}

export default SearchOrder

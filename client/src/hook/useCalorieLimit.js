import { notification } from 'antd'
import { useState, useEffect } from 'react'
import { getCalorieLimitListSvc } from '../service/calorieLimit.service'

const useCalorieLimit = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()

  const [filters, setFilters] = useState({})

  useEffect(() => {
    setLoading(true)
    getCalorieLimitListSvc(filters)
    .then(resp => {
      setItems(resp)
      setLoading(false)
    }).catch(e => {
      notification.error({
        description: e.message
      })
    })
  }, [filters])

  return {
    loading,
    items,
    filters,
    setFilters,
  }
}

export default useCalorieLimit

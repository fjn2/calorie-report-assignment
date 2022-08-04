import { notification } from 'antd'
import { useState, useEffect } from 'react'
import { getSpendingLimitListSvc } from '../service/spendingLimit.service'

const useSpendingLimit = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()

  const [filters, setFilters] = useState({})

  useEffect(() => {
    setLoading(true)
    getSpendingLimitListSvc(filters)
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

export default useSpendingLimit

import { notification } from 'antd'
import { useState, useEffect } from 'react'
import { getUserListSvc } from '../service/user.service'

const useUserList = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()

  const [filters, setFilters] = useState({})

  useEffect(() => {
    setLoading(true)
    getUserListSvc(filters)
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
    setFilters
  }
}

export default useUserList

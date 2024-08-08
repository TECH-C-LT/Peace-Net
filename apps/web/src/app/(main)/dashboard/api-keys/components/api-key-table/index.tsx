import { getApiKeys } from '../../data'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function ApiKeyTable() {
  const apiKeys = await getApiKeys()

  if (!apiKeys) {
    return null
  }

  return (
    <div className="mt-3">
      <DataTable columns={columns} data={apiKeys} />
    </div>
  )
}

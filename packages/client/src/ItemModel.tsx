import { InventoryItem } from "./Inventory"

type ItemModalProps = {
  isOpen: boolean,
  onClose: () => void,
  item: InventoryItem,
}

export const ItemModal = ({ isOpen, onClose, item }: ItemModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 "></div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-48">
        <div className="flex flex-col">
          <div>Name: {item.name}</div>
          <div>Icon: {item.emoji}</div>
          <button
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-900"
            onClick={onClose}
          >
            Close
          </button>
          </div>
      </div>
    </div>
  )
}
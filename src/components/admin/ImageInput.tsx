import { useState } from "react";
import { apiUploadImage } from '../../apis/product'
import axios from "axios"
import { useMessage } from "../../hooks/useMessage"

type ImageInputProps = {
  onUploaded: (url: string) => void
}

export const ImageInput = ({onUploaded}: ImageInputProps) => {
  const { showSuccess, showError } = useMessage()
  const [isUploading, setIsUploading] = useState(false)
  const [tempFileName, setTempFileName] = useState('')
  const [formData, setFormData] = useState<FormData | null>(null)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file-to-upload', file)
    setFormData(formData)
    setTempFileName(file.name)
  }

  const uploadImage = async () => {
    if (!formData) return
    try {
      setIsUploading(true)
      const response = await apiUploadImage(formData)
      onUploaded(response.data.imageUrl)
      showSuccess('圖片上傳成功')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '圖片上傳失敗'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsUploading(false)
      setTempFileName('')
      setFormData(null)
    }
  }
  return (
    <div className="input-group mb-2">
      <label className="input-group-text rounded-lg" htmlFor="imageInputFile">選擇圖片</label>
      <input
        type="file"
        className="form-control d-none"
        id="imageInputFile"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
        />
      <div className="file-name-display form-control rounded-lg">
        {tempFileName}
      </div>
      <button
        className={`btn rounded-lg ms-2 ${formData ? 'btn-outline-primary': 'btn-outline-secondary'}`}
        type="button"
        onClick={uploadImage}
        disabled={isUploading}
        >
        {
          isUploading ?
          <span
          className="spinner-border spinner-border-sm me-1"
          role="status"
          aria-hidden="true"
          ></span>
          : ''
        }
        { isUploading ? '上傳中...' : '上傳圖片' }
      </button>
    </div>
  )
}
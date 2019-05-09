class UploadsController < ApplicationController
  def create
    @upload = Upload.new(upload_params)
    @upload.save

    respond_to do |format|
      format.json { render json: { url: rails_blob_url(@upload.image), upload_id: @upload.id } }
    end
  end

  def destroy
    @upload = Upload.find(params[:id])
    @upload.destroy

    respond_to do |format|
      format.json { render json: { status: :ok } }
    end
  end

  private

  def upload_params
    params.require(:upload).permit(:image)
  end
end

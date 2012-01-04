require 'sinatra'

get '/' do
  haml :index
end

post('/farandole') do
  if params[:css].empty?
    redirect '/'
  end
  "Voila: #{params[:css]} !"
end
